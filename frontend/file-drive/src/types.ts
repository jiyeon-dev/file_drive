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

export type Member = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export type Folder = {
  id: number;
  name: string;
  color: string;
  parent: Folder;
};

export type File = {
  id: number;
  name: string;
  type: string;
  link: string;
  member: Member;
  folder: Folder;
  uploadedAt: Date;
};
