/**
 * Generates branded checklist PDFs into public/downloads/.
 * Run: npm run generate:checklist-pdfs
 *
 * Requires network to fetch Google Fonts TTF files.
 */
import fs from "fs";
import path from "path";
import type { PDFPage, PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import {
  CHECKLIST_PDF_SPECS,
  MOVING_CHECKLIST_RESOURCE_SPEC,
  type ChecklistPdfSpec,
} from "../lib/checklist-pdf-spec";

const A4_W = 595.28;
const A4_H = 841.89;
const MARGIN = 52;
const FOOTER_H = 40;
const LINE_GAP = 3;
const SECTION_GAP = 14;
const CHECK_SIZE = 9;
const CHECK_GAP = 14;

const COL = {
  cream: rgb(248 / 255, 247 / 255, 240 / 255),
  maroon: rgb(135 / 255, 36 / 255, 15 / 255),
  rust: rgb(207 / 255, 79 / 255, 0 / 255),
  dark: rgb(44 / 255, 40 / 255, 35 / 255),
  muted: rgb(74 / 255, 69 / 255, 64 / 255),
  tan: rgb(184 / 255, 149 / 255, 106 / 255),
} as const;

const FONT_TTF = {
  vollkorn400:
    "https://fonts.gstatic.com/s/vollkorn/v30/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGQ.ttf",
  vollkorn700:
    "https://fonts.gstatic.com/s/vollkorn/v30/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df213auGQ.ttf",
  barlow400:
    "https://fonts.gstatic.com/s/barlow/v13/7cHpv4kjgoGqM7EPCw.ttf",
  barlow700:
    "https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E3t-4c4A.ttf",
} as const;

type Fonts = {
  display: PDFFont;
  displayBold: PDFFont;
  body: PDFFont;
  bodyBold: PDFFont;
};

async function fetchFont(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Font fetch failed ${res.status}: ${url}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

async function embedFonts(
  doc: Awaited<ReturnType<typeof PDFDocument.create>>,
): Promise<Fonts> {
  doc.registerFontkit(fontkit);
  const [v400, v700, b400, b700] = await Promise.all([
    fetchFont(FONT_TTF.vollkorn400),
    fetchFont(FONT_TTF.vollkorn700),
    fetchFont(FONT_TTF.barlow400),
    fetchFont(FONT_TTF.barlow700),
  ]);
  const display = await doc.embedFont(v400);
  const displayBold = await doc.embedFont(v700);
  const body = await doc.embedFont(b400);
  const bodyBold = await doc.embedFont(b700);
  return { display, displayBold, body, bodyBold };
}

function wrapLine(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const trial = current ? `${current} ${w}` : w;
    if (font.widthOfTextAtSize(trial, size) <= maxWidth) {
      current = trial;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function drawPageBackground(page: PDFPage) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: A4_W,
    height: A4_H,
    color: COL.cream,
  });
  page.drawRectangle({
    x: 0,
    y: A4_H - 5,
    width: A4_W,
    height: 5,
    color: COL.rust,
  });
}

function drawFooter(
  page: PDFPage,
  fonts: Fonts,
  pageNum: number,
  totalPages: number,
  tagline?: string,
) {
  const yBase = 30;
  page.drawLine({
    start: { x: MARGIN, y: FOOTER_H },
    end: { x: A4_W - MARGIN, y: FOOTER_H },
    thickness: 0.6,
    color: COL.tan,
  });
  page.drawText("japanprotips.com", {
    x: MARGIN,
    y: yBase,
    size: 9,
    font: fonts.bodyBold,
    color: COL.maroon,
  });
  const pageLabel = `Page ${pageNum} of ${totalPages}`;
  const pw = fonts.body.widthOfTextAtSize(pageLabel, 8.5);
  page.drawText(pageLabel, {
    x: A4_W - MARGIN - pw,
    y: yBase + 0.5,
    size: 8.5,
    font: fonts.body,
    color: COL.muted,
  });
  const foot =
    tagline ?? "Independent field notes. Not a travel agency.";
  const footLines = wrapLine(foot, fonts.body, 7.5, A4_W - MARGIN * 2);
  let fy = 16;
  for (const fl of footLines.slice(0, 2)) {
    page.drawText(fl, {
      x: MARGIN,
      y: fy,
      size: 7.5,
      font: fonts.body,
      color: COL.muted,
    });
    fy -= 9;
  }
}

function drawCheckbox(page: PDFPage, x: number, yBaseline: number) {
  page.drawRectangle({
    x,
    y: yBaseline - 2,
    width: CHECK_SIZE,
    height: CHECK_SIZE,
    borderColor: COL.rust,
    borderWidth: 1.2,
    color: COL.cream,
  });
}

function drawEmergencyLayout(
  page: PDFPage,
  spec: ChecklistPdfSpec,
  fonts: Fonts,
) {
  const contentW = A4_W - MARGIN * 2;
  let y = A4_H - MARGIN - 10;
  page.drawText("JAPAN PRO TIPS", {
    x: MARGIN,
    y,
    size: 9,
    font: fonts.bodyBold,
    color: COL.rust,
  });
  y -= 30;
  for (const tl of wrapLine(spec.title, fonts.displayBold, 24, contentW)) {
    page.drawText(tl, {
      x: MARGIN,
      y,
      size: 24,
      font: fonts.displayBold,
      color: COL.maroon,
    });
    y -= 28;
  }
  y -= 4;
  for (const sl of wrapLine(spec.subtitle, fonts.body, 10, contentW)) {
    page.drawText(sl, { x: MARGIN, y, size: 10, font: fonts.body, color: COL.muted });
    y -= 13;
  }
  y -= 20;

  const blocks: { num: string; label: string }[] = [
    { num: "110", label: "Police" },
    { num: "119", label: "Fire and ambulance" },
  ];
  for (const b of blocks) {
    page.drawText(b.num, {
      x: MARGIN,
      y,
      size: 42,
      font: fonts.displayBold,
      color: COL.maroon,
    });
    page.drawText(b.label, {
      x: MARGIN + 118,
      y: y - 6,
      size: 13,
      font: fonts.bodyBold,
      color: COL.dark,
    });
    y -= 58;
  }

  page.drawText("Japan Visitor Hotline (JNTO)", {
    x: MARGIN,
    y,
    size: 11,
    font: fonts.bodyBold,
    color: COL.dark,
  });
  y -= 16;
  page.drawText("050-3816-2787", {
    x: MARGIN,
    y,
    size: 19,
    font: fonts.bodyBold,
    color: COL.rust,
  });
  y -= 22;
  for (const line of wrapLine(
    "English and other languages. Verify on jnto.go.jp before travel.",
    fonts.body,
    9,
    contentW,
  )) {
    page.drawText(line, { x: MARGIN, y, size: 9, font: fonts.body, color: COL.muted });
    y -= 11;
  }
  y -= 20;

  for (const sec of spec.sections) {
    page.drawText(sec.heading.toUpperCase(), {
      x: MARGIN,
      y,
      size: 8.5,
      font: fonts.bodyBold,
      color: COL.rust,
    });
    y -= 15;
    for (const item of sec.items) {
      const lines = wrapLine(item, fonts.body, 9.5, contentW - CHECK_GAP);
      drawCheckbox(page, MARGIN, y);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i]!, {
          x: MARGIN + CHECK_GAP,
          y,
          size: 9.5,
          font: fonts.body,
          color: COL.dark,
        });
        if (i < lines.length - 1) y -= 12;
      }
      y -= 13;
    }
    y -= SECTION_GAP;
  }
}

async function buildPdf(spec: ChecklistPdfSpec): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(spec.title);
  pdf.setAuthor("JapanProTips");
  pdf.setSubject(spec.subtitle);
  pdf.setKeywords(["Japan", "checklist", "JapanProTips"]);
  pdf.setProducer("JapanProTips checklist generator");

  const fonts = await embedFonts(pdf);
  const contentW = A4_W - MARGIN * 2;

  if (spec.compact) {
    const page = pdf.addPage([A4_W, A4_H]);
    drawPageBackground(page);
    drawEmergencyLayout(page, spec, fonts);
    drawFooter(page, fonts, 1, 1, spec.tagline);
    return pdf.save();
  }

  let page = pdf.addPage([A4_W, A4_H]);
  drawPageBackground(page);
  let y = A4_H - MARGIN - 8;

  const ensureSpace = (neededFromBaseline: number) => {
    if (y - neededFromBaseline < FOOTER_H + 28) {
      page = pdf.addPage([A4_W, A4_H]);
      drawPageBackground(page);
      y = A4_H - MARGIN - 8;
      page.drawText(`${spec.title} (continued)`, {
        x: MARGIN,
        y,
        size: 12,
        font: fonts.displayBold,
        color: COL.maroon,
      });
      y -= 26;
    }
  };

  page.drawText("JAPAN PRO TIPS", {
    x: MARGIN,
    y,
    size: 9,
    font: fonts.bodyBold,
    color: COL.rust,
  });
  y -= 22;
  const titleLines = wrapLine(spec.title, fonts.displayBold, 22, contentW);
  for (const tl of titleLines) {
    ensureSpace(30);
    page.drawText(tl, {
      x: MARGIN,
      y,
      size: 22,
      font: fonts.displayBold,
      color: COL.maroon,
    });
    y -= 28;
  }
  y -= 4;
  for (const sl of wrapLine(spec.subtitle, fonts.body, 11, contentW)) {
    ensureSpace(16);
    page.drawText(sl, {
      x: MARGIN,
      y,
      size: 11,
      font: fonts.body,
      color: COL.muted,
    });
    y -= 14;
  }
  y -= 10;
  ensureSpace(12);
  page.drawLine({
    start: { x: MARGIN, y: y + 6 },
    end: { x: A4_W - MARGIN, y: y + 6 },
    thickness: 0.75,
    color: COL.tan,
  });
  y -= SECTION_GAP;

  for (const sec of spec.sections) {
    ensureSpace(28);
    page.drawText(sec.heading, {
      x: MARGIN,
      y,
      size: 13,
      font: fonts.displayBold,
      color: COL.maroon,
    });
    y -= 18;
    for (const item of sec.items) {
      const lines = wrapLine(item, fonts.body, 10, contentW - CHECK_GAP);
      const blockH = lines.length * 12 + LINE_GAP + 8;
      ensureSpace(blockH);
      drawCheckbox(page, MARGIN, y);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i]!, {
          x: MARGIN + CHECK_GAP,
          y,
          size: 10,
          font: fonts.body,
          color: COL.dark,
        });
        if (i < lines.length - 1) y -= 12;
      }
      y -= 12 + LINE_GAP + 6;
    }
    if (sec.note) {
      for (const nl of wrapLine(sec.note, fonts.body, 9, contentW)) {
        ensureSpace(14);
        page.drawText(nl, {
          x: MARGIN + 6,
          y,
          size: 9,
          font: fonts.body,
          color: COL.muted,
        });
        y -= 11;
      }
    }
    y -= SECTION_GAP - 6;
  }

  const allPages = pdf.getPages();
  const n = allPages.length;
  for (let i = 0; i < n; i++) {
    drawFooter(allPages[i]!, fonts, i + 1, n, spec.tagline);
  }

  return pdf.save();
}

async function main() {
  const root = process.cwd();
  const outDir = path.join(root, "public", "downloads");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const allSpecs: ChecklistPdfSpec[] = [
    ...Object.values(CHECKLIST_PDF_SPECS),
    MOVING_CHECKLIST_RESOURCE_SPEC,
  ];

  for (const spec of allSpecs) {
    const bytes = await buildPdf(spec);
    const dest = path.join(outDir, spec.filename);
    fs.writeFileSync(dest, bytes);
    console.log(`Wrote ${path.relative(root, dest)}`);
  }

  console.log(`Done. ${allSpecs.length} PDFs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
