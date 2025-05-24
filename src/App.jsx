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
  Hint,
  AnimationContainer,
  FailAnimationText
} from './styles/AppStyles'
import AnimatedText from './components/AnimatedText'
import Fireworks from './components/Fireworks'
import EmojiRain from './components/EmojiRain'
import DarkOverlay from './components/DarkOverlay'
import useSounds from './hooks/useSounds'

function App() {
  const [name, setName] = useState('')
  const [showInput, setShowInput] = useState(true)
  const [animationState, setAnimationState] = useState(null)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showEmojiRain, setShowEmojiRain] = useState(false)
  const [showDarkOverlay, setShowDarkOverlay] = useState(false)
  const [showAnimatedText, setShowAnimatedText] = useState(false)
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
  
  const textRef = useRef(null)
  const containerRef = useRef(null)
  const { playTada } = useSounds()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setShowInput(false)
      
      if (name === correctName) {
        setAnimationState('success')
        runSuccessAnimation()
      } else {
        setAnimationState('fail')
        runFailAnimation()
      }
    }
  }

  // 성공 애니메이션 시퀀스
  const runSuccessAnimation = () => {
    // 1. 배경 어둡게
    setShowDarkOverlay(true)
    
    // 2. 0.5초 후 폭죽 시작
    setTimeout(() => {
      setShowFireworks(true)
      playTada() // 성공 사운드 재생
    }, 500)
    
    // 3. 1초 후 이모지 비 시작
    setTimeout(() => {
      setShowEmojiRain(true)
    }, 1000)
    
    // 4. 1.5초 후 애니메이션 텍스트 시작
    setTimeout(() => {
      setShowAnimatedText(true)
    }, 1500)
    
    // 5. 애니메이션 텍스트가 끝나면 handleAnimatedTextComplete에서 resetAnimations를 호출함
  }

  // 실패 애니메이션
  const runFailAnimation = () => {
    if (!textRef.current) return
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setShowInput(true)
          setAnimationState(null)
          setName('')
        }, 2000)
      }
    })
    
    // 실패 애니메이션
    tl.fromTo(textRef.current, 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    )
    .to(textRef.current, { 
      x: 10, 
      duration: 0.1, 
      repeat: 5, 
      yoyo: true,
      ease: "power1.inOut" 
    })
    .to(textRef.current, { 
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.5
    })
  }

  // 모든 애니메이션 리셋
  const resetAnimations = () => {
    setShowDarkOverlay(false)
    setShowFireworks(false)
    setShowEmojiRain(false)
    setShowAnimatedText(false)
    
    setTimeout(() => {
      setShowInput(true)
      setAnimationState(null)
      setName('')
    }, 1000)
  }

  // 애니메이션 텍스트 완료 핸들러
  const handleAnimatedTextComplete = () => {
    // 애니메이션 텍스트가 완료되면 0.5초 후 모든 것 리셋
    setTimeout(() => {
      resetAnimations()
    }, 500)
  }

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  return (
    <>
      <GlobalStyle />
      <Root>
        <AppContainer ref={containerRef}>
          {showInput ? (
            <InputContainer>
              <Title>이름을 입력하세요</Title>
              <Form onSubmit={handleSubmit}>
                <Input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
                <Button type="submit">확인</Button>
              </Form>
              <Hint>힌트: 정답은 "{correctName}"</Hint>
            </InputContainer>
          ) : (
            <AnimationContainer>
              {animationState === 'fail' && (
                <FailAnimationText ref={textRef}>
                  <Title>아쉽습니다, {name}...</Title>
                  <p>다시 시도해보세요!</p>
                </FailAnimationText>
              )}
            </AnimationContainer>
          )}
          
          {/* 다크 오버레이 */}
          <DarkOverlay isActive={showDarkOverlay} />
          
          {/* 폭죽 애니메이션 */}
          {showFireworks && (
            <Fireworks 
              duration={8000} 
              onComplete={() => {}} 
            />
          )}
          
          {/* 이모지 비 애니메이션 */}
          {showEmojiRain && (
            <EmojiRain 
              duration={10000} 
              density={40} 
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
