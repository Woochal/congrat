import styled from 'styled-components';

// 루트 컨테이너
export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 앱 컨테이너
export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
`;

// 입력 컨테이너
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 90%;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    width: 85%;
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    padding: 20px;
  }
`;

// 제목
export const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
  font-weight: 700;
  font-size: 3.2em;
  line-height: 1.1;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 2em;
    margin-bottom: 15px;
  }
`;

// 폼
export const Form = styled.form`
  width: 100%;
`;

// 입력 필드
export const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: #646cff;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

// 버튼
export const Button = styled.button`
  width: 100%;
  padding: 15px 20px;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-appearance: none;
  appearance: none;
  
  &:hover {
    background-color: #535bf2;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:focus, &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

// 힌트
export const Hint = styled.p`
  margin-top: 15px;
  color: #888;
  font-size: 14px;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// 애니메이션 컨테이너
export const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// 실패 애니메이션 텍스트
export const FailAnimationText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: #f44336;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.5rem;
    color: #555;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// 파티클
export const Particle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
`; 