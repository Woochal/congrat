import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

// 이모지 컨테이너
const EmojiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 50;
`;

// 개별 이모지 스타일
const EmojiStyle = {
  position: 'absolute',
  fontSize: '30px',
  userSelect: 'none',
  pointerEvents: 'none',
  opacity: 0,
  zIndex: 5
};

const EmojiRain = ({ duration = 6000, density = 30 }) => {
  const containerRef = useRef(null);
  const emojisRef = useRef([]);
  const animationsRef = useRef([]);
  
  // 이모지 목록
  const emojis = ['🎉', '✨', '🥳', '🎊', '🎈', '🎯', '🎮', '🎪', '🎭', '💎', '🎁', '🏆', '🏅', '🔥', '💯', '⭐'];
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 컨테이너 초기화
    containerRef.current.innerHTML = '';
    emojisRef.current = [];
    
    // 이모지 생성
    for (let i = 0; i < density; i++) {
      createEmoji();
    }
    
    // 일정 시간마다 새로운 이모지 추가
    const interval = setInterval(() => {
      if (emojisRef.current.length < 100) {
        createEmoji();
        createEmoji();
      }
    }, 500);
    
    // 타임아웃 설정
    const timeout = setTimeout(() => {
      clearInterval(interval);
      
      // 모든 애니메이션 종료
      animationsRef.current.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
      
      // 모든 이모지 제거
      gsap.to(emojisRef.current, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.01,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
          emojisRef.current = [];
          animationsRef.current = [];
        }
      });
    }, duration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      
      // 모든 애니메이션 정리
      animationsRef.current.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
    };
  }, [duration, density]);
  
  // 이모지 생성 함수
  const createEmoji = () => {
    if (!containerRef.current) return;
    
    // 랜덤 이모지 선택
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // 이모지 엘리먼트 생성
    const element = document.createElement('div');
    Object.assign(element.style, EmojiStyle);
    element.textContent = emoji;
    
    // 랜덤 시작 위치 설정
    const startX = Math.random() * window.innerWidth;
    const startY = -50; // 화면 위에서 시작
    
    // 랜덤 크기 설정
    const scale = 0.5 + Math.random() * 2;
    
    // 스타일 설정
    gsap.set(element, {
      x: startX,
      y: startY,
      scale,
      rotation: Math.random() * 360,
      opacity: 0
    });
    
    // 컨테이너에 추가
    containerRef.current.appendChild(element);
    emojisRef.current.push(element);
    
    // 애니메이션 생성
    const duration = 3 + Math.random() * 4;
    const tl = gsap.timeline();
    
    // 등장 애니메이션
    tl.to(element, {
      opacity: 1,
      duration: 0.3
    });
    
    // 낙하 애니메이션
    tl.to(element, {
      y: window.innerHeight + 100,
      x: startX + (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
      duration,
      ease: "power1.in",
      onComplete: () => {
        if (containerRef.current && containerRef.current.contains(element)) {
          containerRef.current.removeChild(element);
          
          // 배열에서 제거
          const index = emojisRef.current.indexOf(element);
          if (index > -1) {
            emojisRef.current.splice(index, 1);
          }
          
          // 애니메이션 배열에서 제거
          const animIndex = animationsRef.current.indexOf(tl);
          if (animIndex > -1) {
            animationsRef.current.splice(animIndex, 1);
          }
        }
      }
    }, "-=0.3");
    
    // 좌우 흔들림 효과
    tl.to(element, {
      x: startX + (Math.random() - 0.5) * 100,
      duration: duration * 0.3,
      ease: "sine.inOut",
      repeat: 3,
      yoyo: true
    }, "-=" + duration);
    
    // 회전 효과
    tl.to(element, {
      rotation: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
      duration: duration * 0.5,
      ease: "sine.inOut",
      repeat: 1,
      yoyo: true
    }, "-=" + duration);
    
    // 애니메이션 저장
    animationsRef.current.push(tl);
  };
  
  return <EmojiContainer ref={containerRef} />;
};

export default EmojiRain; 