import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File } from "@/types";
import { handler as fileDelete } from "@/actions/file/delete";

import { MoreVertical, TrashIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";

interface CardActionsProps {
  file: File;
}

export default function TrashCardActions({ file }: CardActionsProps) {
  const queryClient = useQueryClient();
  const toggleLoading = useLoadingSpinner((state) => state.toggle);

  // 파일 복구
  const deleteFile = async () => {
    toggleLoading(true);
    const result = await fileDelete({
      fileId: file.id,
      isDelete: false,
    });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
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
          onClick={deleteFile}
          className='flex gap-1 items-center cursor-pointer'
        >
          <div className='flex gap-1 text-red-600 items-center cursor-pointer'>
            <TrashIcon className='w-4 h-4' /> 복구
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
