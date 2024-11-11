export const ERROR_MESSAGES = {
  nickname: {
    required: '닉네임을 입력해주세요.',
    pattern: '영문/한글/숫자 포함 2~12자로 작성해주세요.',
    duplicate: '이미 존재하는 닉네임입니다.',
  },
  gender: { required: '성별을 선택해주세요.' },
  age: { required: '연령대를 선택해주세요.' },
  region: { required: '거주 지역을 선택해주세요.' },
};

export const REG_EXP = {
  nickname: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,12}$/,
};

export const FORM_DEFAULT_VALUES = {
  nickname: '',
  profileImage: null,
  gender: undefined,
  age: undefined,
  bigRegion: undefined,
  smallRegion: undefined,
  favoriteArtists: [],
};
