/**
 * endExerciseTone
 * 
 * Plays an A note sine wave for a little under a second.
 * When isFinishedTone is `true`, note is played an octave higher.
 * 
 * @param isFinishedTone set to true if this is the last note
 */
export const endExerciseTone = (isFinishedTone: boolean): void => {
  try {
    if (typeof window === "undefined") return;

    const audioCtx = new window.AudioContext();
    const masterGainNode = audioCtx.createGain();
    const oscillatorNode = audioCtx.createOscillator();
    const oscGainNode = audioCtx.createGain();
    // const reverbNode = audioCtx.createConvolver();
    
    // // Create reverb
    // const sampleRate = audioCtx.sampleRate;
    // const length = sampleRate * 1;
    // const impulse = audioCtx.createBuffer(2, length, sampleRate);
    // const impulseL = impulse.getChannelData(0);
    // const impulseR = impulse.getChannelData(1);
    // const decay = 2.0;

    // for (var i = 0; i < length; i++){
    //   impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    //   impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    // }

    // reverbNode.buffer = impulse;

    oscillatorNode.type = "sine";
    oscillatorNode.frequency.setValueAtTime(
      isFinishedTone ? 880 : 440,
      audioCtx.currentTime
    );
    oscillatorNode.connect(oscGainNode);
    oscGainNode.connect(masterGainNode);
    //reverbNode.connect(masterGainNode);
    masterGainNode.connect(audioCtx.destination);
    
    oscillatorNode.start();
    //oscGainNode.gain.setValueAtTime(0.003, audioCtx.currentTime);
    oscGainNode.gain.exponentialRampToValueAtTime(0.9, audioCtx.currentTime + 0.001);
    oscGainNode.gain.exponentialRampToValueAtTime(0.000001, audioCtx.currentTime + 0.3);
    oscillatorNode.stop(audioCtx.currentTime + 0.31);

    setTimeout(() => {
      oscillatorNode.disconnect();
      oscGainNode.disconnect();
      //reverbNode.disconnect();
      masterGainNode.disconnect();
      audioCtx.close();
    }, 450);
    
  } catch (err) {
    console.error("Sound error", err);
  }
};
