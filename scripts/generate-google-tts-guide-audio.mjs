import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import textToSpeech from "@google-cloud/text-to-speech";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const VOICE_CONFIG = {
  languageCode: "en-US",
  name: "en-US-Standard-D",
  audioEncoding: "MP3",
  speakingRate: 0.95,
};

const MAX_BYTES = 4500;

function utf8Bytes(value) {
  return Buffer.byteLength(value, "utf8");
}

function splitLongSentenceByWords(sentence, maxBytes) {
  const chunks = [];
  const words = sentence.split(/\s+/).filter(Boolean);
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (utf8Bytes(next) <= maxBytes) {
      current = next;
      continue;
    }

    if (current) chunks.push(current);
    current = word;
  }

  if (current) chunks.push(current);
  return chunks;
}

function splitTextForGoogleTts(text, maxBytes = MAX_BYTES) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [paragraph];

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;

      if (utf8Bytes(trimmedSentence) > maxBytes) {
        const splitPieces = splitLongSentenceByWords(trimmedSentence, maxBytes);
        for (const piece of splitPieces) {
          const nextFromCurrent = current ? `${current} ${piece}` : piece;
          if (utf8Bytes(nextFromCurrent) <= maxBytes) {
            current = nextFromCurrent;
          } else {
            if (current) chunks.push(current);
            current = piece;
          }
        }
        continue;
      }

      const next = current ? `${current} ${trimmedSentence}` : trimmedSentence;
      if (utf8Bytes(next) <= maxBytes) {
        current = next;
      } else {
        if (current) chunks.push(current);
        current = trimmedSentence;
      }
    }

    if (current) {
      chunks.push(current);
      current = "";
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

async function loadGuideText(slug) {
  const sourcePath = path.join(projectRoot, "data", "guide-read-aloud.json");
  const raw = await fs.readFile(sourcePath, "utf8");
  const parsed = JSON.parse(raw);
  const entry = parsed[slug];

  if (!entry?.text) {
    throw new Error(
      `No curated read-aloud text found for slug "${slug}" in data/guide-read-aloud.json`,
    );
  }

  return entry.text;
}

async function assertVoiceAvailable(client, languageCode, voiceName) {
  const [voicesResponse] = await client.listVoices({ languageCode });
  const available = voicesResponse.voices ?? [];
  const hasRequested = available.some((voice) => voice.name === voiceName);

  if (!hasRequested) {
    throw new Error(
      [
        `Google voice "${voiceName}" is not available for language "${languageCode}".`,
        "Run a voice listing command first, then update VOICE_CONFIG.name in scripts/generate-google-tts-guide-audio.mjs.",
        "Example: node -e \"import tts from '@google-cloud/text-to-speech'; const c = new tts.TextToSpeechClient(); c.listVoices({ languageCode: 'en-US' }).then(([r]) => console.log((r.voices||[]).map(v => v.name).filter(Boolean).join('\\n')));\"",
      ].join("\n"),
    );
  }
}

async function synthesizeChunk(client, text) {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: VOICE_CONFIG.languageCode,
      name: VOICE_CONFIG.name,
    },
    audioConfig: {
      audioEncoding: VOICE_CONFIG.audioEncoding,
      speakingRate: VOICE_CONFIG.speakingRate,
    },
  });

  if (!response.audioContent) {
    throw new Error("Google TTS returned empty audioContent for one chunk.");
  }

  if (typeof response.audioContent === "string") {
    return Buffer.from(response.audioContent, "base64");
  }

  return Buffer.from(response.audioContent);
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    throw new Error(
      "Missing slug argument. Usage: node scripts/generate-google-tts-guide-audio.mjs japan-mistakes-new-residents",
    );
  }

  const text = await loadGuideText(slug);
  const chunks = splitTextForGoogleTts(text, MAX_BYTES);
  if (!chunks.length) {
    throw new Error(`No text chunks generated for slug "${slug}".`);
  }

  const client = new textToSpeech.TextToSpeechClient();
  await assertVoiceAvailable(client, VOICE_CONFIG.languageCode, VOICE_CONFIG.name);

  const outputDir = path.join(projectRoot, "public", "audio", "residents", slug);
  await fs.mkdir(outputDir, { recursive: true });

  const parts = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const audioBuffer = await synthesizeChunk(client, chunk);
    const fileName = `part-${String(index + 1).padStart(3, "0")}.mp3`;
    const outputPath = path.join(outputDir, fileName);
    await fs.writeFile(outputPath, audioBuffer);
    parts.push(fileName);
  }

  const manifest = {
    slug,
    voiceProvider: "google",
    voiceTier: "standard",
    languageCode: VOICE_CONFIG.languageCode,
    voiceName: VOICE_CONFIG.name,
    audioEncoding: VOICE_CONFIG.audioEncoding,
    speakingRate: VOICE_CONFIG.speakingRate,
    parts,
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(
    path.join(outputDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  console.log(`Generated ${parts.length} MP3 part(s) for ${slug}.`);
  console.log(`Output directory: ${outputDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
