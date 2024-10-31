import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";

let audioContext: AudioContext | null = null;

const FADE_DURATION = 0.01;

/**
 * Plays a sound using the Web Audio API.
 *
 * @param context - The audio context to use for generating the sound.
 * @param frequency - The frequency of the sound in Hertz
 * @param durationMs - The duration of the sound in milliseconds.
 * @param volumePct - The volume of the sound, typically between 0 and 1.
 */
export function playSound(
  frequency: number,
  durationMs: number,
  volumePct: number,
): void {
  if (frequency <= 0) {
    throw new RangeError("Frequency must be a positive number.");
  }

  if (durationMs <= 0) {
    throw new RangeError("Duration must be a positive number.");
  }

  if (volumePct < 0 || volumePct > 1) {
    throw new RangeError("Volume must be between 0 and 1.");
  }

  audioContext ??= new AudioContext();

  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime);

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(volumePct, audioContext.currentTime);

  // Creates the smooth fades-in / fade-out sound effect (Avoids the popping sounds)
  gainNode.gain.linearRampToValueAtTime(
    volumePct,
    audioContext.currentTime + FADE_DURATION,
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    audioContext.currentTime + durationMs / MS_IN_SEC - FADE_DURATION,
  );

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillatorNode.start();
  oscillatorNode.stop(audioContext.currentTime + durationMs / MS_IN_SEC);
}
