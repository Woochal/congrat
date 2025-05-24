import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import useSounds from '../hooks/useSounds';

// 애니메이션 텍스트 컨테이너
const TextContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
  overflow: hidden;
`;

// 텍스트 라인 컨테이너
const TextLineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(50px);
`;

// 텍스트 라인
const TextLine = styled.div`
  font-size: 8vw;
  font-family: 'SUIT', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  color: #ffffff;
  max-width: 90%;
  transform-origin: center;
  
  @media (max-width: 768px) {
    font-size: 10vw;
  }
  
  @media (max-width: 480px) {
    font-size: 14vw;
  }
`;

// 단일 문자
const Char = styled.span`
  display: inline-block;
  opacity: 0;
  transform: scale(0.5);
  transform-origin: center;
`;

const AnimatedText = ({ onComplete }) => {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const charsRef = useRef([]);
  const { playPop, playTada } = useSounds();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  
  // 각 라인별로 애니메이션 스타일 정의 - 시간 단축
  const messageLines = [
    { text: "와아아~~!!", charByChar: false, scale: 1, fontSize: 9, displayTime: 500 },
    { text: "이게 꿈이야 생시야!!", charByChar: true, scale: 1.0, fontSize: 6, displayTime: 600 },
    { text: "송지원님!!", charByChar: false, scale: 1, fontSize: 12, displayTime: 700 },
    { text: "승.진.이라뇨?!?", charByChar: true, scale: 1, fontSize: 8, displayTime: 600 },
    { text: "이 정도면", charByChar: false, scale: 1.0, fontSize: 7, displayTime: 400 },
    { text: "드라마 주인공급", charByChar: true, scale: 1, fontSize: 8, displayTime: 500 },
    { text: "인 생 전 개", charByChar: true, scale: 1, fontSize: 12, displayTime: 800 },
    { text: "아닙니까~!!!🎬", charByChar: false, scale: 1, fontSize: 6, displayTime: 500 },
    { text: "일 잘해, 성격 좋아,\n외모까지 미쳤는데…", charByChar: true, scale: 1, fontSize: 6, displayTime: 850 },
    { text: "이제 승진까지!?", charByChar: false, scale: 1, fontSize: 9, displayTime: 600 },
    { text: "회사가 사람을 \n볼 줄 아네!", charByChar: true, scale: 1, fontSize: 7, displayTime: 650 },
    { text: "송.지.원 님!", charByChar: true, scale: 1, fontSize: 12, displayTime: 800 },
    { text: "이번 승진은\n우주가 정해둔", charByChar: false, scale: 1.0, fontSize: 7, displayTime: 650 },
    { text: "운명이었습니다요⭐", charByChar: false, scale: 1.0, fontSize: 7, displayTime: 650 },
    { text: "이제는", charByChar: true, scale: 1, fontSize: 8, displayTime: 400 },
    { text: "송팀장?", charByChar: true, scale: 1, fontSize: 10, displayTime: 500 },
    { text: "송실장?", charByChar: true, scale: 1, fontSize: 11, displayTime: 500 },
    { text: "아니면 그냥", charByChar: true, scale: 1, fontSize: 6, displayTime: 450 },
    { text: " 송CEO!?", charByChar: true, scale: 1, fontSize: 13, displayTime: 850 },
    { text: "모두 박수!!!", charByChar: true, scale: 1, fontSize: 9, displayTime: 650 },
    { text: "승진 축하드려요!!!", charByChar: true, scale: 1, fontSize: 9, displayTime: 850 }
  ];
  
  // 한 라인씩 애니메이션 실행
  const animateNextLine = (index) => {
    if (index >= messageLines.length) {
      // 모든 라인 애니메이션 완료
      if (onComplete) {
        // 마지막 애니메이션이 끝난 후 즉시 콜백 실행
        setTimeout(() => {
          onComplete();
        }, 500);
      }
      return;
    }
    
    setCurrentLineIndex(index);
    const lineContainer = linesRef.current[index];
    const lineInfo = messageLines[index];
    
    if (!lineContainer) return;
    
    // 라인 컨테이너 표시 - 더 빠르게
    gsap.to(lineContainer, {
      opacity: 1,
      y: 0,
      duration: 0.2, // 더 빠르게
      ease: "power2.out",
      onStart: () => {
        playPop();
      }
    });
    
    // 한 글자씩 나타나는 애니메이션 또는 전체 텍스트 애니메이션
    if (lineInfo.charByChar && charsRef.current[index]) {
      const chars = charsRef.current[index];
      
      // 각 글자마다 애니메이션 설정 - 더 빠르게
      gsap.to(chars, {
        opacity: 1,
        scale: 1,
        duration: 0.08, // 더 빠르게
        stagger: 0.02, // 더 빠르게
        ease: "back.out(1.7)",
        onStart: () => {
          // 중간에 효과음 추가
          if (index % 3 === 0) playPop();
        },
        onComplete: () => {
          // 개별 표시 시간 적용
          const displayTime = lineInfo.displayTime || 400;
          setTimeout(() => {
            // 현재 라인 숨기기 - 더 빠르게
            gsap.to(lineContainer, {
              opacity: 0,
              y: -50,
              duration: 0.2, // 더 빠르게
              ease: "power2.in",
              onComplete: () => {
                // 다음 라인 애니메이션
                animateNextLine(index + 1);
              }
            });
          }, displayTime);
        }
      });
    } else {
      // 전체 텍스트가 한번에 나타나는 애니메이션 - 더 빠르게
      const textElement = lineContainer.querySelector('.text-line');
      
      gsap.fromTo(textElement, 
        { scale: 0.7, opacity: 0 },
        { 
          scale: lineInfo.scale, 
          opacity: 1, 
          duration: 0.3, // 더 빠르게
          ease: "elastic.out(1, 0.5)",
          onStart: () => {
            playPop();
          },
          onComplete: () => {
            // 개별 표시 시간 적용
            const displayTime = lineInfo.displayTime || 400;
            setTimeout(() => {
              // 현재 라인 숨기기 - 더 빠르게
              gsap.to(lineContainer, {
                opacity: 0,
                y: -50,
                duration: 0.2, // 더 빠르게
                ease: "power2.in",
                onComplete: () => {
                  // 다음 라인 애니메이션
                  animateNextLine(index + 1);
                }
              });
            }, displayTime);
          }
        }
      );
    }
  };
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 컨테이너 초기화
    containerRef.current.innerHTML = '';
    linesRef.current = [];
    charsRef.current = [];
    
    // 각 텍스트 라인에 대한 요소 생성
    messageLines.forEach((line, index) => {
      // 라인 컨테이너 생성
      const lineContainer = document.createElement('div');
      lineContainer.className = 'text-line-container';
      lineContainer.style.position = 'absolute';
      lineContainer.style.top = '0';
      lineContainer.style.left = '0';
      lineContainer.style.width = '100%';
      lineContainer.style.height = '100%';
      lineContainer.style.display = 'flex';
      lineContainer.style.alignItems = 'center';
      lineContainer.style.justifyContent = 'center';
      lineContainer.style.opacity = '0';
      lineContainer.style.transform = 'translateY(50px)';
      
      // 텍스트 라인 생성
      const textLine = document.createElement('div');
      textLine.className = 'text-line';
      
      // 각 라인별 개별 폰트 크기 적용
      const fontSize = line.fontSize || 8; // 기본값 8vw
      textLine.style.fontSize = `${fontSize}vw`;
      
      textLine.style.fontWeight = '900'; // 더 굵게
      textLine.style.lineHeight = '1.2';
      textLine.style.textAlign = 'center';
      textLine.style.color = '#FFFFFF'; // 모든 텍스트 흰색으로 통일
      textLine.style.maxWidth = '90%';
      textLine.style.transformOrigin = 'center';
      textLine.style.textShadow = '0 0 10px rgba(0,0,0,0.3)'; // 가독성을 위한 텍스트 그림자
      textLine.style.fontFamily = "'SUIT', -apple-system, BlinkMacSystemFont, sans-serif";
      
      // 미디어 쿼리 대체
      if (window.innerWidth <= 768) {
        // 모바일에서는 1.25배 크게
        textLine.style.fontSize = `${fontSize * 1.25}vw`;
      }
      if (window.innerWidth <= 480) {
        // 작은 모바일에서는 1.5배 크게
        textLine.style.fontSize = `${fontSize * 1.5}vw`;
      }
      
      if (line.charByChar) {
        // 한 글자씩 나타나는 경우
        const chars = [];
        line.text.split('').forEach((char, charIndex) => {
          const charSpan = document.createElement('span');
          
          // 줄바꿈 처리
          if (char === '\n') {
            charSpan.innerHTML = '<br/>';
            charSpan.style.display = 'block';
            charSpan.style.height = '0.2em';
            charSpan.style.opacity = '1'; // 줄바꿈은 항상 보이게
          } else {
            charSpan.textContent = char;
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'scale(0.5)';
            charSpan.style.transformOrigin = 'center';
            
            // 너비 지정
            if (char === ' ') {
              charSpan.style.width = '0.5em';
              charSpan.innerHTML = '&nbsp;'; // 공백 문자 사용
            }
          }
          
          textLine.appendChild(charSpan);
          chars.push(charSpan);
        });
        charsRef.current[index] = chars;
      } else {
        // 한번에 나타나는 경우 - 줄바꿈 지원
        textLine.innerHTML = line.text.replace(/\n/g, '<br/>');
      }
      
      lineContainer.appendChild(textLine);
      containerRef.current.appendChild(lineContainer);
      linesRef.current[index] = lineContainer;
    });
    
    // 첫 번째 라인 애니메이션 시작 - 딜레이 감소
    setTimeout(() => {
      animateNextLine(0);
    }, 100);
    
    // 애니메이션 클리어
    return () => {
      gsap.killTweensOf(linesRef.current);
      charsRef.current.forEach(chars => {
        if (chars) gsap.killTweensOf(chars);
      });
    };
  }, []);
  
  return <TextContainer ref={containerRef} />;
};

export default AnimatedText; 