import { Folder, Response } from "@/types";
import FolderCard from "./FolderCard";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/authFetch";

export function FolderCardContainer() {
  const [searchParams] = useSearchParams();
  const { folder } = useLoaderData() as {
    folder: Folder;
  };
  const folderId = (searchParams.get("folderId") || 1) as number;
  const hasParentFolder = folderId > 1;
  const parentId = folder?.parent?.id || 1;

  const { data } = useQuery({
    queryKey: ["folder", { folderId }],
    queryFn: ({ queryKey }) => fetchFolders({ queryKey }),
  });

  return (
    <>
      <div className='flex items-center justify-between'>
        {hasParentFolder && (
          <Link to={`/files?folder=${parentId}`}>
            <Button variant='ghost'>
              <ArrowLeftCircleIcon />
            </Button>
          </Link>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {data?.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>
    </>
  );
}

export const MemoizedFolderCardContainer = memo(FolderCardContainer);

type SearchOption = { folderId: number };
const fetchFolders = async ({
  queryKey,
}: {
  queryKey: (string | SearchOption)[];
}) => {
  try {
    const folderId = (queryKey[1] as SearchOption).folderId;
    const response = await authFetch(`/api/folder/list?folderId=${folderId}`, {
      method: "GET",
    });
    const result = (await response?.json()) as Response<Folder[]>;
    return result.resultData;
  } catch (e) {
    return [];
  }
};
