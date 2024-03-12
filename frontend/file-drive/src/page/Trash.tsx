import NoDnDFileTabs from "@/components/NoDnDFileTabs";
import { FileType, Response } from "@/types";
import { defer } from "react-router-dom";

export default function TrashPage() {
  return (
    <>
      <NoDnDFileTabs />
    </>
  );
}

const fetchFileTypes = async () => {
  try {
    const response = await fetch("/api/file/fileTypes");
    const result = (await response.json()) as Response<FileType[]>;
    if (result.resultStatus.isSuccess) return result.resultData;
    else return [];
  } catch (e) {
    return [];
  }
};

export const loader = async () => {
  const fileTypes = await fetchFileTypes();
  return defer({ fileTypes });
};
