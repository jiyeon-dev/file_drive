import FileTabs from "@/components/FileTabs";
import { FileType, Response } from "@/types";

export default function FilesPage() {
  return <FileTabs />;
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
  const data = await fetchFileTypes();
  return { fileTypes: data };
};
