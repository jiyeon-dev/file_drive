import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File } from "@/types";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { handler as fileDelete } from "@/actions/file/delete";
import { handler as fileFavorite } from "@/actions/file/favorite";

import {
  FileIcon,
  FolderIcon,
  MoreVertical,
  Star,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";
import { useState } from "react";

interface CardActionsProps {
  file: File;
}

export default function CardActions({ file }: CardActionsProps) {
  const queryClient = useQueryClient();
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const [favorite, setFavorite] = useState(file.favorite || false);

  console.log(file);

  // 파일 다운로드
  const download = async () => {
    if (!file.link) return;
    const storageRef = ref(storage, file.link);
    const url = await getDownloadURL(storageRef);
    window.open(url, "_blank");
  };

  // 좋아요 토글
  const toggleFavorite = async () => {
    toggleLoading(true);
    await fileFavorite({
      fileId: file.id,
      isFavorite: !favorite,
    });
    setFavorite(!favorite);
    toggleLoading(false);
  };

  // 파일 삭제
  const deleteFile = async () => {
    toggleLoading(true);
    const result = await fileDelete({
      fileId: file.id,
      isDelete: !file.isDelete,
    });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
    toggleLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={download}
          className='flex gap-1 items-center cursor-pointer'
        >
          <FileIcon className='w-4 h-4' /> 저장
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={toggleFavorite}
          className='flex gap-1 items-center cursor-pointer'
        >
          {favorite ? (
            <div className='flex gap-1 items-center'>
              <StarIcon className='w-4 h-4' /> 싫어요
            </div>
          ) : (
            <div className='flex gap-1 items-center'>
              <Star className='w-4 h-4' /> 좋아요
            </div>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          // onClick={download}
          className='flex gap-1 items-center cursor-pointer'
        >
          <FolderIcon className='w-4 h-4' /> 이동
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={deleteFile}
          className='flex gap-1 items-center cursor-pointer'
        >
          <div className='flex gap-1 text-red-600 items-center cursor-pointer'>
            <TrashIcon className='w-4 h-4' /> 삭제
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
