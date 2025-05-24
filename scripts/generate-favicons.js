/**
 * 이 스크립트는 SVG 파일을 다양한 크기의 PNG 및 JPG 파일로 변환합니다.
 * 실제로 실행하려면 sharp 패키지가 필요합니다.
 * 
 * 설치 방법:
 * npm install sharp --save-dev
 * 
 * 실행 방법:
 * node scripts/generate-favicons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// __dirname 구현 (ES 모듈에서는 기본적으로 제공되지 않음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 경로 설정
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMG_DIR = path.join(PUBLIC_DIR, 'img');

// 디렉토리 확인/생성
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// SVG 파일을 PNG로 변환
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
    
    // 참고: ICO 파일은 PNG 파일로 대체합니다. 실제 ICO 파일은 필요한 경우 온라인 변환 도구를 사용하세요.
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
    
    console.log('Generated favicon.png (for favicon.ico replacement)');
    
    // 오픈 그래프 이미지
    const ogSvgBuffer = fs.readFileSync(path.join(PUBLIC_DIR, 'og-image.svg'));
    
    // JPG 버전 생성 (소셜 미디어에서 더 높은 호환성)
    await sharp(ogSvgBuffer)
      .resize(1200, 630)
      .jpeg({ quality: 90 })
      .toFile(path.join(IMG_DIR, 'og-image.jpg'));
    
    console.log('Generated og-image.jpg');
    
    // HTML 파일 업데이트
    // OG 이미지를 SVG에서 JPG로 변경
    let htmlContent = fs.readFileSync(path.join(PUBLIC_DIR, '../index.html'), 'utf8');
    
    // 현재 도메인 확인 (개발 환경에서는 기본값 사용)
    const domain = process.env.SITE_URL || 'https://congrat-site.vercel.app';
    
    // 오픈 그래프 이미지 URL 업데이트
    htmlContent = htmlContent.replace(
      /<meta property="og:image" content="[^"]*"/g,
      `<meta property="og:image" content="${domain}/img/og-image.jpg"`
    );
    
    // 트위터 이미지 URL 업데이트
    htmlContent = htmlContent.replace(
      /<meta name="twitter:image" content="[^"]*"/g,
      `<meta name="twitter:image" content="${domain}/img/og-image.jpg"`
    );
    
    // favicon 업데이트
    htmlContent = htmlContent.replace(
      /<link rel="shortcut icon" href="[^"]*"/g,
      `<link rel="shortcut icon" href="/favicon.png"`
    );
    
    fs.writeFileSync(path.join(PUBLIC_DIR, '../index.html'), htmlContent);
    
    console.log('Updated HTML file with JPG image references');
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 