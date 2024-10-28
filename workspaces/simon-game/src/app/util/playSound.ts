export const playSound = (
  context: BaseAudioContext,
  frequency: number,
  duration: number,
  volume: number,
) => {
  const oscillatorNode = context.createOscillator();
  oscillatorNode.frequency.setValueAtTime(frequency, context.currentTime);

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(volume, context.currentTime);

  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);

  oscillatorNode.start();
  oscillatorNode.stop(context.currentTime + duration / 1000);
};
