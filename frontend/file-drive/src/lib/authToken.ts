import { Token, TokenType } from "@/types";

const AuthToken = {
  /**
   * 토큰 저장
   * @param data 토큰
   */
  setToken: (data: Token) => {
    sessionStorage.setItem(TokenType.ACCESS, data.accessToken);
    sessionStorage.setItem(TokenType.REFRESH, data.refreshToken);
  },
  /**
   * 특정 토큰 조회
   * @param key 토큰 키
   * @returns {string} 토큰 값
   */
  getToken: (key: TokenType): string => {
    return sessionStorage.getItem(key) || "";
  },
  /**
   * 토큰 전제 조회
   * @returns {Token} 토큰 값
   */
  getTokenAll: (): Token => {
    return {
      [TokenType.ACCESS]: sessionStorage.getItem(TokenType.ACCESS) || "",
      [TokenType.REFRESH]: sessionStorage.getItem(TokenType.REFRESH) || "",
    };
  },
  /**
   * 토큰 전체 삭제
   */
  removeTokenAll: () => {
    sessionStorage.removeItem(TokenType.ACCESS);
    sessionStorage.removeItem(TokenType.REFRESH);
  },
};

export default AuthToken;
