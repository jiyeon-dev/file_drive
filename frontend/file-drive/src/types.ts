export type Response<T> = {
  resultData: T;
  resultStatus: {
    isSuccess: boolean;
    resultCode: "0" | "1";
    resultMessage: string;
  };
};

export enum TokenType {
  ACCESS = "accessToken",
  REFRESH = "refreshToken",
}

export type Token = {
  [K in TokenType]: string;
};
