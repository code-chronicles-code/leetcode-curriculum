/**
 * Plays a sound using the Web Audio API.
 *
 * @param context - The audio context to use for generating the sound.
 * @param frequency - The frequency of the sound in Hertz
 * @param duration - The duration of the sound in milliseconds.
 * @param volume - The volume of the sound, typically between 0 and 1.
 */
export const playSound = (
  context: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
) => {
  if (frequency <= 0) {
    throw new Error("Frequency must be a positive number.");
  }

  if (duration <= 0) {
    throw new Error("Duration must be a positive number.");
  }

  if (volume < 0 || volume > 1) {
    throw new Error("Volume must be between 0 and 1.");
  }

  const oscillatorNode = context.createOscillator();
  oscillatorNode.frequency.setValueAtTime(frequency, context.currentTime);

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(volume, context.currentTime);

  // Creates the smooth fades-in / fade-out sound effect (Avoids the popping sounds)
  gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(
    0,
    context.currentTime + duration / 1000 - 0.01,
  );

  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);

  oscillatorNode.start();
  oscillatorNode.stop(context.currentTime + duration / 1000);
};
