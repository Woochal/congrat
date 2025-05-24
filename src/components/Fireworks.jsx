import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import styled from 'styled-components';
import useSounds from '../hooks/useSounds';

// 전체 화면 오버레이
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

const Fireworks = ({ duration = 4000, onComplete }) => {
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);
  const { playBoom, playCheer } = useSounds();
  
  useEffect(() => {
    // 폭죽 효과음 재생
    playBoom();
    setTimeout(() => playCheer(), 800);
    
    // Canvas 설정
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    // 랜덤 색상 생성 함수
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    
    // 폭죽 시작 위치 배열
    const origins = [
      { x: 0.1, y: 0.5 },
      { x: 0.9, y: 0.5 },
      { x: 0.5, y: 0.5 },
      { x: 0.2, y: 0.3 },
      { x: 0.8, y: 0.3 }
    ];
    
    // 색상 배열
    const colors = [
      '#FF577F', '#FF884B', '#FFBD9B', '#F9F871', '#7ED7C1', 
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
    ];
    
    // 여러 개의 폭죽 애니메이션 동시 실행
    const launchFireworks = () => {
      // 첫 번째 큰 폭죽
      setTimeout(() => {
        myConfetti({
          particleCount: 200,
          spread: 120,
          origin: { x: 0.5, y: 0.6 },
          colors: colors,
          startVelocity: 45,
          gravity: 0.8,
          scalar: 1.2,
          ticks: 100
        });
        playBoom();
      }, 300);
      
      // 여러 위치에서 동시에 발사
      setTimeout(() => {
        origins.forEach((origin, i) => {
          setTimeout(() => {
            myConfetti({
              particleCount: 80,
              angle: randomInRange(60, 120),
              spread: randomInRange(50, 100),
              origin,
              colors: colors.slice(Math.floor(Math.random() * 5), Math.floor(Math.random() * 5) + 5),
              startVelocity: randomInRange(30, 50),
              gravity: 0.8,
              scalar: randomInRange(0.8, 1.2),
              drift: randomInRange(-0.2, 0.2),
              ticks: 80
            });
            if (i % 2 === 0) playBoom();
          }, i * 300);
        });
      }, 800);
      
      // 스타버스트 효과
      setTimeout(() => {
        myConfetti({
          particleCount: 300,
          spread: 360,
          startVelocity: 45,
          gravity: 0.5,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
          shapes: ['circle', 'square'],
          scalar: 1.5,
          ticks: 120
        });
        playBoom();
      }, 1500);
      
      // 글리터 효과
      setTimeout(() => {
        const interval = setInterval(() => {
          myConfetti({
            particleCount: 10,
            angle: randomInRange(0, 360),
            spread: randomInRange(30, 70),
            origin: { 
              x: randomInRange(0.2, 0.8), 
              y: randomInRange(0.2, 0.8) 
            },
            startVelocity: randomInRange(20, 40),
            colors: [colors[Math.floor(Math.random() * colors.length)]],
            shapes: ['star'],
            scalar: 0.8,
            ticks: 50,
            gravity: 0.7
          });
        }, 150);
        
        setTimeout(() => {
          clearInterval(interval);
        }, 1500);
      }, 2000);
    };
    
    // 폭죽 애니메이션 시작
    launchFireworks();
    
    // 애니메이션 종료 시간 설정
    timeoutRef.current = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, onComplete, playBoom, playCheer]);
  
  return (
    <OverlayContainer>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
    </OverlayContainer>
  );
};

export default Fireworks; 