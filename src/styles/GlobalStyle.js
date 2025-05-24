import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'SUIT', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: #333;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: none;
    background-color: #ffffff;
  }

  #root {
    width: 100%;
    height: 100%;
  }
  
  /* 모바일 환경에서 텍스트 선택 방지 */
  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* 애니메이션 성능 최적화 */
  .gpu-accelerated {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;

export default GlobalStyle; 