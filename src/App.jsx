import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import GlobalStyle from './styles/GlobalStyle'
import {
  Root,
  AppContainer,
  InputContainer,
  Title,
  Form,
  Input,
  Button,
  AnimationContainer,
  ErrorMessage
} from './styles/AppStyles'
import AnimatedText from './components/AnimatedText'
import Fireworks from './components/Fireworks'
import EmojiRain from './components/EmojiRain'
import DarkOverlay from './components/DarkOverlay'
import useSounds from './hooks/useSounds'
import BackgroundMusic from './components/BackgroundMusic'

function App() {
  const [name, setName] = useState('')
  const [showInput, setShowInput] = useState(true)
  const [animationState, setAnimationState] = useState(null)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showEmojiRain, setShowEmojiRain] = useState(false)
  const [showDarkOverlay, setShowDarkOverlay] = useState(false)
  const [showAnimatedText, setShowAnimatedText] = useState(false)
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false)
  const [inputError, setInputError] = useState(false)
  const inputRef = useRef(null)
  const correctName = '송지원' 
  const messageLines = [
    `아니 당신은?`, 
    `설마 ${correctName}님!??`,
    `와아아아아아~~ 이게 꿈이야 생시야!!`,
    `${correctName} 님!!`,
    `승.진.이라뇨?!?`,
    `이 정도면 거의 드라마 주인공급 인생 전개 아닙니까~!!! 🎬`,
    `일 잘해`,
    `성격 좋아`,
    `외모까지 미쳤는데`,
    `이제 승진까지!?`,
    `회사가 사람 보는 눈 확실하네`,
    `${correctName[0]}.${correctName[1]}.${correctName[2]} 님,`,
    `이번 승진은 우주가 정해둔 운명이었습니다요⭐`,
    `이제는 송팀장? 송실장?`,
    `아니면 그냥 송CEO 가는 거야?!🔥`,
    `모두 박수!!!!!!!!!!`,
    `축하드려요!!!`
  ];
  
  const containerRef = useRef(null)
  const { playTada } = useSounds()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      if (name === correctName) {
        setShowInput(false)
        setAnimationState('success')
        setInputError(false)
        runSuccessAnimation()
      } else {
        setInputError(true)
        inputRef.current.focus()
      }
    }
  }

  // 성공 애니메이션 시퀀스
  const runSuccessAnimation = () => {
    // 1. 배경 어둡게
    setShowDarkOverlay(true)
    
    // 2. 0.2초 후 폭죽 시작
    setTimeout(() => {
      setShowFireworks(true)
      playTada() // 성공 사운드 재생
    }, 200)
    
    // 3. 0.4초 후 이모지 비 시작
    setTimeout(() => {
      setShowEmojiRain(true)
    }, 400)
    
    // 4. 2.5초 후 애니메이션 텍스트 시작 (파티클 애니메이션 끝나고 시작)
    setTimeout(() => {
      setShowAnimatedText(true)
      setPlayBackgroundMusic(true) // 텍스트 애니메이션과 함께 배경음악 시작
    }, 2500)
    
    // 5. 애니메이션 텍스트가 끝나면 handleAnimatedTextComplete에서 resetAnimations를 호출함
  }

  // 모든 애니메이션 리셋
  const resetAnimations = () => {
    setShowDarkOverlay(false)
    setShowFireworks(false)
    setShowEmojiRain(false)
    setShowAnimatedText(false)
    setPlayBackgroundMusic(false) // 배경음악 중지
    
    setTimeout(() => {
      setShowInput(true)
      setAnimationState(null)
      setName('')
    }, 1000)
  }

  // 애니메이션 텍스트 완료 핸들러
  const handleAnimatedTextComplete = () => {
    // 텍스트 애니메이션 완료 후 이모지 애니메이션 한번 더 실행
    setShowAnimatedText(false); // 텍스트 애니메이션 숨기기
    
    // 약간의 딜레이 후 이모지 애니메이션 재시작
    setTimeout(() => {
      setShowEmojiRain(true); // 이모지 애니메이션 다시 활성화
      playTada(); // 효과음 재생
      
      // 이모지 애니메이션 지속 시간 후 모든 애니메이션 종료
      setTimeout(() => {
        resetAnimations();
      }, 3500); // 이모지 애니메이션 지속 시간 증가 (3.5초)
    }, 300);
  }

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  useEffect(() => {
    if (inputError && name === correctName) {
      setInputError(false)
    }
  }, [name, inputError])

  return (
    <>
      <GlobalStyle />
      <Root>
        <AppContainer ref={containerRef}>
          {showInput ? (
            <InputContainer>
              <Title>느좋패밀리</Title>
              <Form onSubmit={handleSubmit}>
                <Input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  error={inputError}
                />
                {inputError && <ErrorMessage>이름을 확인하세요</ErrorMessage>}
                <Button type="submit">확인</Button>
              </Form>
            </InputContainer>
          ) : (
            <AnimationContainer>
            </AnimationContainer>
          )}
          
          {/* 배경 음악 - 라이센스 경고 구간 스킵을 위해 startTime과 endTime 설정 */}
          <BackgroundMusic 
            isPlaying={playBackgroundMusic} 
            volume={0.4} 
            startTime={13} 
            skipSegment={{
              start: 30,  // 라이센스 경고 시작 시간(초)
              end: 33     // 라이센스 경고 종료 시간(초)
            }}
          />
          
          {/* 다크 오버레이 */}
          <DarkOverlay isActive={showDarkOverlay} />
          
          {/* 폭죽 애니메이션 - 2.5초로 시간 조정 */}
          {showFireworks && (
            <Fireworks 
              duration={2500} 
              onComplete={() => {}} 
            />
          )}
          
          {/* 이모지 비 애니메이션 - 지속 시간 조정 */}
          {showEmojiRain && (
            <EmojiRain 
              duration={3500} 
              density={40}
              isFinalAnimation={showAnimatedText === false && animationState === 'success'}
            />
          )}
          
          {/* 애니메이션 텍스트 */}
          {showAnimatedText && (
            <AnimatedText 
              onComplete={handleAnimatedTextComplete} 
            />
          )}
        </AppContainer>
      </Root>
    </>
  )
}

export default App
