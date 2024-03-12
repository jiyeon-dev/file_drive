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
  owner: Member;
  folder: Folder;
  isDelete: boolean;
  uploadedAt: Date;
  favorite: boolean;
};

export interface Page<T> {
  content: T[];
  number: number; // 현재 페이지 번호
  size: number; // 페이지 크기
  totalElements: number; // 전체 데이터 수
  totalPages: number; // 전체 페이지 수
  first: boolean; // 첫 페이지인지
  last: true; // 마지막 페이지인지
}

export type FileType = {
  id: string;
  value: string;
};
