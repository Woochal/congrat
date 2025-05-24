import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

// 이모지 비 컨테이너
const EmojiRainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 150;
  overflow: hidden;
`;

// 이모지 목록 - 텍스트로 표현된 이모지
const emojis = ['🎉', '🎊', '✨', '💖', '🎈', '🎂', '🥂', '🍾', '🎇', '🎆', '🌟', '⭐', '💫', '🏆', '🥇', '🎯', '🚀', '💯', '🔥', '👑'];

const EmojiRain = ({ duration = 3500, density = 40, isFinalAnimation = false }) => {
  const containerRef = useRef(null);
  const animationsRef = useRef([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 컨테이너 초기화
    containerRef.current.innerHTML = '';
    animationsRef.current = [];
    
    // 이모지 개수 (최종 애니메이션일 경우 밀도 증가)
    const emojiCount = isFinalAnimation ? density * 1.5 : density;
    
    // 이모지 생성
    for (let i = 0; i < emojiCount; i++) {
      // 랜덤 이모지 선택
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      // 이모지 요소 생성
      const emoji = document.createElement('div');
      emoji.className = 'emoji';
      emoji.textContent = randomEmoji;
      emoji.style.position = 'absolute';
      emoji.style.fontSize = `${Math.random() * 20 + 20}px`; // 20px ~ 40px
      emoji.style.opacity = '0';
      emoji.style.zIndex = '150';
      emoji.style.userSelect = 'none';
      
      // 중앙에서 폭죽처럼 퍼지는 애니메이션을 위한 초기 위치
      emoji.style.left = '50%';
      emoji.style.top = '50%';
      emoji.style.transform = 'translate(-50%, -50%)';
      
      containerRef.current.appendChild(emoji);
      
      // 이모지가 멀리 날아가는 시간 계산
      const flyDuration = Math.random() * 0.8 + 0.8; // 0.8s ~ 1.6s
      
      // 애니메이션 적용
      const tl = gsap.timeline();
      
      // 퍼지는 애니메이션
      tl.to(emoji, {
        x: `${(Math.random() - 0.5) * window.innerWidth * (isFinalAnimation ? 2 : 1.5)}`, // 더 멀리 날아가도록 거리 증가
        y: `${(Math.random() - 0.5) * window.innerHeight * (isFinalAnimation ? 2 : 1.5)}`, // 더 멀리 날아가도록 거리 증가
        opacity: 1,
        rotation: Math.random() * 360,
        duration: flyDuration,
        delay: Math.random() * 0.3, // 0s ~ 0.3s
        ease: "power2.out"
      });
      
      // 잠시 유지했다가 사라지는 애니메이션
      tl.to(emoji, {
        opacity: 0,
        scale: isFinalAnimation ? 1.5 : 1.2,
        duration: Math.random() * 0.5 + 0.7, // 0.7s ~ 1.2s
        delay: Math.random() * 0.4 + 0.3, // 0.3s ~ 0.7s
        ease: "power1.in"
      }, ">");
      
      // 애니메이션 참조 저장
      animationsRef.current.push(tl);
    }
    
    // duration 시간 후에 강제로 모든 애니메이션 종료
    const cleanupTimeout = setTimeout(() => {
      if (containerRef.current) {
        // 남아있는 이모지 모두 페이드아웃
        const remainingEmojis = containerRef.current.querySelectorAll('.emoji');
        gsap.to(remainingEmojis, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.02,
          ease: "power1.in",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
            }
          }
        });
      }
    }, duration - 500); // 정리를 위해 500ms 일찍 시작
    
    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      clearTimeout(cleanupTimeout);
      
      // 모든 애니메이션 중지
      animationsRef.current.forEach(tl => {
        if (tl) tl.kill();
      });
      
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current.children);
      }
    };
  }, [density, isFinalAnimation, duration]);
  
  return <EmojiRainContainer ref={containerRef} />;
};

export default EmojiRain; 