import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

// 어두운 배경 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s ease;
  z-index: 10;
  pointer-events: none;
`;

const DarkOverlay = ({ isActive, duration = 400 }) => {
  const overlayRef = useRef(null);
  
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isActive) {
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
        duration: duration / 1000
      });
    } else {
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        duration: duration / 1000
      });
    }
  }, [isActive, duration]);
  
  return <Overlay ref={overlayRef} />;
};

export default DarkOverlay; 