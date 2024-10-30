let audioContext: AudioContext | null = null;

/**
 * Plays a sound using the Web Audio API.
 *
 * @param context - The audio context to use for generating the sound.
 * @param frequency - The frequency of the sound in Hertz
 * @param durationMs - The duration of the sound in milliseconds.
 * @param volume - The volume of the sound, typically between 0 and 1.
 */
export const playSound = (
  frequency: number,
  durationMs: number,
  volumePct: number,
) => {
  if (frequency <= 0) {
    throw new Error("Frequency must be a positive number.");
  }

  if (durationMs <= 0) {
    throw new Error("Duration must be a positive number.");
  }

  if (volumePct < 0 || volumePct > 1) {
    throw new Error("Volume must be between 0 and 1.");
  }

  audioContext ??= new AudioContext();

  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime);

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(volumePct, audioContext.currentTime);

  // Creates the smooth fades-in / fade-out sound effect (Avoids the popping sounds)
  gainNode.gain.linearRampToValueAtTime(
    volumePct,
    audioContext.currentTime + 0.01,
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    audioContext.currentTime + durationMs / 1000 - 0.01,
  );

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillatorNode.start();
  oscillatorNode.stop(audioContext.currentTime + durationMs / 1000);
};
