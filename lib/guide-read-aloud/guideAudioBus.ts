/**
 * Mutual exclusion between prerecorded GuideAudioPlayer and browser TTS read-aloud.
 * Starting one side notifies the other to stop; neither is removed from the UI.
 */

export type GuideAudioBusEvent =
  | { type: "tts-start"; guideSlug: string }
  | { type: "tts-stop"; guideSlug: string }
  | { type: "prerecorded-start"; guideSlug: string }
  | { type: "prerecorded-stop"; guideSlug: string };

type Listener = (event: GuideAudioBusEvent) => void;

const listeners = new Set<Listener>();

export function subscribeGuideAudioBus(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitGuideAudioBus(event: GuideAudioBusEvent): void {
  for (const listener of listeners) {
    try {
      listener(event);
    } catch {
      // Ignore listener errors so one player cannot break the other.
    }
  }
}
