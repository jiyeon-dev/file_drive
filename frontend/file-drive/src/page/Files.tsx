import FileTabs from "@/components/FileTabs";
import FolderEditDialog from "@/components/FolderEditDialog";
import { authFetch } from "@/lib/authFetch";
import { FileType, Folder, Response } from "@/types";
import { defer } from "react-router-dom";

export default function FilesPage() {
  return (
    <>
      <FileTabs />
      <FolderEditDialog />
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

const fetchFolders = async ({ folderId = 1 }) => {
  try {
    const response = await authFetch(`/api/folder/list?folderId=${folderId}`, {
      method: "GET",
    });
    const result = (await response?.json()) as Response<Folder[]>;
    return result.resultData;
  } catch (e) {
    return [];
  }
};

const fetchFolder = async ({ folderId = 1 }) => {
  try {
    const response = await authFetch(`/api/folder?folderId=${folderId}`, {
      method: "GET",
    });
    const result = (await response?.json()) as Response<Folder>;
    return result.resultData;
  } catch (e) {
    return {};
  }
};

export const loader = async ({ request }: { request: Request }) => {
  const folderId = (new URL(request.url).searchParams.get("folderId") ||
    1) as number;

  const fileTypes = await fetchFileTypes();
  const folders = await fetchFolders({ folderId });
  const folder = await fetchFolder({ folderId });

  return defer({ fileTypes, folders, folder });
};
