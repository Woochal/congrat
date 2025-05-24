import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SUIT';
    font-weight: 400;
    src: url('/fonts/SUIT-Regular.woff2') format('woff2');
  }
  
  @font-face {
    font-family: 'SUIT';
    font-weight: 700;
    src: url('/fonts/SUIT-Bold.woff2') format('woff2');
  }
  
  @font-face {
    font-family: 'SUIT';
    font-weight: 800;
    src: url('/fonts/SUIT-ExtraBold.woff2') format('woff2');
  }
  
  @font-face {
    font-family: 'SUIT';
    font-weight: 900;
    src: url('/fonts/SUIT-Heavy.woff2') format('woff2');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'SUIT', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    overflow-x: hidden;
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