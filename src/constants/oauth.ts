class OAuth {
  #KAKAO_REST_API = process.env.NEXT_PUBLIC_KAKAO_REST_API;
  #KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  #NAVER_REST_API = process.env.NEXT_PUBLIC_NAVER_REST_API;
  #NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

  kakao() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.#KAKAO_REST_API}&redirect_uri=${this.#KAKAO_REDIRECT_URI}&response_type=code`;
  }

  naver() {
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.#NAVER_REST_API}&state=STATE_STRING&redirect_uri=${this.#NAVER_REDIRECT_URI}`;
  }
}

export const OAUTH = new OAuth();
