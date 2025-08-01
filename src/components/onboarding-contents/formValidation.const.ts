export const ERROR_MESSAGES = {
  nickname: {
    required: '닉네임을 입력해주세요.',
    pattern: '영문/한글/숫자 포함 2~12자로 작성해주세요.',
    duplicate: '이미 존재하는 닉네임입니다.',
  },
  name: {
    required: '이름을 입력해주세요.',
    pattern: '한글 혹은 영문(띄어쓰기 포함) 2~20자로 작성해주세요.',
  },
  phoneNumber: {
    required: '휴대전화번호를 입력해주세요.',
    pattern: '올바른 휴대전화번호를 입력해주세요.',
  },
  gender: { required: '성별을 선택해주세요.' },
  age: { required: '연령대를 선택해주세요.' },
  region: { required: '거주 지역을 선택해주세요.' },
};

export const REG_EXP = {
  nickname: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,12}$/,
  name: /^([가-힣]{2,20}|[a-zA-Z\s]{2,20})$/,
  phoneNumber: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
};

export const FORM_DEFAULT_VALUES = {
  nickname: '',
  name: '',
  phoneNumber: '',
  profileImage: null,
  gender: undefined,
  age: undefined,
  bigRegion: undefined,
  smallRegion: undefined,
  favoriteArtists: [],
  isAgreedServiceTerms: false,
  isAgreedPersonalInfo: false,
  isAgreedMarketing: false,
};
