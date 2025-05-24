import useSound from 'use-sound';

// 사운드 URL 경로
const SOUNDS = {
  pop: '/sounds/pop.mp3',
  tada: '/sounds/tada.mp3',
  boom: '/sounds/boom.mp3',
  cheer: '/sounds/cheer.mp3',
};

// 사운드 볼륨 설정
const soundOptions = {
  volume: 0.5,
  interrupt: true,
};

export function useSounds() {
  // 사운드 훅 생성
  const [playPop] = useSound(SOUNDS.pop, { ...soundOptions, volume: 0.3 });
  const [playTada] = useSound(SOUNDS.tada, soundOptions);
  const [playBoom] = useSound(SOUNDS.boom, soundOptions);
  const [playCheer] = useSound(SOUNDS.cheer, soundOptions);

  return {
    playPop,
    playTada,
    playBoom,
    playCheer,
  };
}

export default useSounds; 