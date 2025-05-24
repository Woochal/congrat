import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = ({ isPlaying, volume = 0.3, startTime = 30, skipSegment = null }) => {
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const skipCheckIntervalRef = useRef(null);
  
  useEffect(() => {
    // 오디오 요소 생성
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/background_music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // 로드 완료 이벤트
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });
      
      // 에러 처리
      audioRef.current.addEventListener('error', (e) => {
        console.error('오디오 로드 에러:', e);
      });
      
      // 로드 시작
      audioRef.current.load();
    }
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      // 타이머 정리
      if (skipCheckIntervalRef.current) {
        clearInterval(skipCheckIntervalRef.current);
        skipCheckIntervalRef.current = null;
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);
  
  // isPlaying prop이 변경될 때마다 재생/정지
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;
    
    // 재생 시 특정 구간 스킵 기능 설정
    const setupSkipSegment = () => {
      if (skipSegment && skipSegment.start && skipSegment.end) {
        // 이전 인터벌 정리
        if (skipCheckIntervalRef.current) {
          clearInterval(skipCheckIntervalRef.current);
        }
        
        // 현재 시간을 주기적으로 체크하여 스킵 구간인지 확인
        skipCheckIntervalRef.current = setInterval(() => {
          if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            
            // 스킵 구간에 진입하면 종료 시간으로 이동
            if (currentTime >= skipSegment.start && currentTime < skipSegment.end) {
              console.log(`스킵 구간 감지: ${currentTime}초 -> ${skipSegment.end}초로 이동`);
              audioRef.current.currentTime = skipSegment.end;
            }
          }
        }, 100); // 100ms마다 체크
      }
    };
    
    if (isPlaying) {
      // 시작 위치 설정 (초 단위)
      audioRef.current.currentTime = startTime;
      
      // 사용자 상호작용 후 자동 재생 문제 해결을 위한 처리
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 재생 성공 시 스킵 기능 설정
            setupSkipSegment();
          })
          .catch(error => {
            console.error('자동 재생이 허용되지 않았습니다:', error);
          });
      }
    } else {
      audioRef.current.pause();
      
      // 재생 중지 시 타이머 정리
      if (skipCheckIntervalRef.current) {
        clearInterval(skipCheckIntervalRef.current);
        skipCheckIntervalRef.current = null;
      }
    }
    
    return () => {
      // 이펙트 정리 시 타이머 정리
      if (skipCheckIntervalRef.current) {
        clearInterval(skipCheckIntervalRef.current);
        skipCheckIntervalRef.current = null;
      }
    };
  }, [isPlaying, isLoaded, startTime, skipSegment]);
  
  // 볼륨 변경 시 적용
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // UI가 없는 컴포넌트
  return null;
};

export default BackgroundMusic; 