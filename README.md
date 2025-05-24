# 축하 애니메이션 웹 서비스

이름을 입력하면 축하 애니메이션이 출력되는 인터랙티브 웹 서비스입니다.

## 기능

- 흰색 배경 중앙에 이름을 입력받는 Input 제공
- 정확한 이름을 입력하면 화려한 축하 애니메이션 출력
- 잘못된 이름을 입력하면 다른 텍스트 애니메이션 출력
- 애니메이션 출력 중에는 Input이 사라졌다가 애니메이션 종료 후 다시 나타남
- 모던하고 깔끔한 UI 디자인

## 기술 스택

- React
- JavaScript
- Vite
- GSAP (애니메이션 라이브러리)

## 실행 방법

1. 프로젝트 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 빌드
```bash
npm run build
```

## 사용법

정답은 "John"입니다. 이 이름을 입력하면 축하 애니메이션이 표시됩니다.
다른 이름을 입력하면 실패 애니메이션이 표시됩니다.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
