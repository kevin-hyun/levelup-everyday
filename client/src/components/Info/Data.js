import img1 from '../../images/svg-1.svg';
import img2 from '../../images/svg-2.svg';
import img3 from '../../images/svg-3.svg';

export const homeObjOne = {
  id: 'about',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: '오늘도 레벨업?',
  headline: '자신의 성장 수치를 한눈에 파악해보세요',
  description:
    ' 다른 사람들과 비교하는 데 지치셨나요? 어제의 나와 비교하며 레벨업하는 자신을 확인할 수 있어요!',
  buttonLabel: '서비스 시작',
  imgStart: true,
  img: img1,
  alt: 'car',
  dark: true,
  primary: true,
  darkText: true,
};

export const homeObjTwo = {
  id: '목표설정',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: '목표설정',
  headline: '나만의 목표를 설정해보세요! ',
  description:
    '미리 정해진 목표가 아닌 스스로 중요하다고 생각하는 목표를 설정하고 달성하기 위해 노력해보아요.',
  buttonLabel: '목표 설정하기',
  imgStart: false,
  img: img2,
  alt: '목표설정',
  dark: true,
  primary: true,
  darkText: true,
};

export const homeObjThree = {
  id: '성장곡선',
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: '성장곡선',
  headline: '하루하루 성장하는 스스로를 그래프로 확인가능해요',
  description:
    '매일매일 기록할수록 빠르게 성장하는 성잠점수를 한눈에 그래프로 확인하며 동기부여할수 있어요.',
  buttonLabel: '그래프 확인',
  imgStart: false,
  img: img3,
  alt: '성장곡선',
  dark: true,
  primary: true,
  darkText: false,
};
