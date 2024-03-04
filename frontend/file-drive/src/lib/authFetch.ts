import AuthToken from "@/lib/authToken";
import { Response, Token, TokenType } from "@/types";
import { toast } from "sonner";
import _ from "lodash";
import { MESSAGE } from "./message";

export const authFetch = async (
  url: string,
  options: RequestInit,
  retry?: boolean // 재귀호출인지 체크
): Promise<globalThis.Response | null> => {
  const authOptions = setAuthToken(options);
  const response = await fetch(url, authOptions);

  // 토큰 만료 및 토큰 에러 발생 → 리프레시 토큰으로 토큰 재 조회
  if (!retry && response.status === 403) {
    const result = await getNewToken();
    if (result) authFetch(url, options, true); // 다시 호출
  }

  // 인증 오류가 아닌 알수 없는 오류가 발생한 경우
  if (!response.ok) {
    toast.error(MESSAGE.E01, { id: "auth-fetch" });
    return null;
  }

  return response;
};

/**
 * 헤더에 토큰 추가
 * @param options
 * @returns
 */
const setAuthToken = (options: RequestInit) => {
  const newOptions = _.cloneDeep(options);
  const authorization = {
    Authorization: `Bearer ${AuthToken.getToken(TokenType.ACCESS)}`,
  };

  if (newOptions.headers) {
    Object.assign(newOptions.headers, authorization);
  } else {
    newOptions["headers"] = authorization;
  }

  return newOptions;
};

/**
 * 새 토큰 조회
 * @returns 성공 여부
 */
const getNewToken = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/re-get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AuthToken.getTokenAll()),
    });

    const result = (await response.json()) as Response<Token>;
    if (result.resultStatus.isSuccess) {
      AuthToken.setToken(result.resultData);
      return true;
    } else {
      // 토큰 만료
      window.location.href = `/signin?error=${MESSAGE.E02}`;
      return false;
    }
  } catch (e) {
    window.location.href = `/signin?error=${MESSAGE.E01}`;
    return false;
  }
};
