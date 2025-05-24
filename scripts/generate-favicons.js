/**
 * 이 스크립트는 SVG 파일을 다양한 크기의 PNG 및 ICO 파일로 변환하는 예시입니다.
 * 실제로 실행하려면 sharp, ico-converter 등의 패키지가 필요합니다.
 * 
 * 설치 방법:
 * npm install sharp ico-converter --save-dev
 * 
 * 실행 방법:
 * node scripts/generate-favicons.js
 */

/*
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const icoConverter = require('ico-converter');

// 경로 설정
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMG_DIR = path.join(PUBLIC_DIR, 'img');

// 디렉토리 확인/생성
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// SVG 파일을 PNG로 변환 후 ICO로 변환
async function generateFavicons() {
  try {
    // SVG를 다양한 크기의 PNG로 변환
    const svgBuffer = fs.readFileSync(path.join(PUBLIC_DIR, 'favicon.svg'));
    
    // 애플 터치 아이콘 (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(IMG_DIR, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon.png');
    
    // favicon 이미지 (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(IMG_DIR, 'favicon-32x32.png'));
    
    console.log('Generated favicon-32x32.png');
    
    // favicon 이미지 (16x16)
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(IMG_DIR, 'favicon-16x16.png'));
    
    console.log('Generated favicon-16x16.png');
    
    // ICO 파일 생성 (여러 크기 포함)
    await icoConverter.fromPng(
      path.join(IMG_DIR, 'favicon-32x32.png'),
      path.join(PUBLIC_DIR, 'favicon.ico'),
      { sizes: [16, 24, 32, 64] }
    );
    
    console.log('Generated favicon.ico');
    
    // 오픈 그래프 이미지
    const ogSvgBuffer = fs.readFileSync(path.join(PUBLIC_DIR, 'og-image.svg'));
    
    await sharp(ogSvgBuffer)
      .resize(1200, 630)
      .png()
      .toFile(path.join(IMG_DIR, 'og-image.png'));
    
    console.log('Generated og-image.png');
    
    // HTML 파일 업데이트
    // OG 이미지를 SVG에서 PNG로 변경
    let htmlContent = fs.readFileSync(path.join(PUBLIC_DIR, '../index.html'), 'utf8');
    htmlContent = htmlContent.replace(
      '<meta property="og:image" content="/og-image.svg" />',
      '<meta property="og:image" content="/img/og-image.png" />'
    );
    htmlContent = htmlContent.replace(
      '<meta name="twitter:image" content="/og-image.svg" />',
      '<meta name="twitter:image" content="/img/og-image.png" />'
    );
    
    fs.writeFileSync(path.join(PUBLIC_DIR, '../index.html'), htmlContent);
    
    console.log('Updated HTML file with PNG references');
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
*/

console.log('이 스크립트는 예시 코드입니다. 실행하려면 주석을 제거하고 필요한 패키지를 설치하세요.'); 