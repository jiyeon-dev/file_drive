import { handler as fileUpload, toast_id } from "@/actions/file/upload";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";
import { MESSAGE } from "@/lib/message";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFolderEditorDialog } from "@/hook/useFolderEditorDialog";

export default function DnDZone({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const toggleFolderEditorDialog = useFolderEditorDialog(
    (state) => state.toggle
  );
  const [dragOver, isDragOver] = useState(false);
  const [searchParams] = useSearchParams();

  const dropHandler = async (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 1) {
      toast.warning(MESSAGE.EF02, toast_id);
      return;
    }

    toggleLoading(true);
    const folderId = (searchParams.get("folderId") || 1) as number;
    const result = await fileUpload({ file: files[0], folderId });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
    toggleLoading(false);
  };

  const dragoverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(true);
  };
  const dragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(false);
  };

  // 폴더 생성 모달 열기
  const handleNewFolder = () => {
    toggleFolderEditorDialog(true);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            onDrop={dropHandler}
            onDragOver={dragoverHandler}
            onDragLeave={dragLeaveHandler}
            className={`my-2 border rounded-md px-2 mb-2 overflow-x-auto ${
              dragOver ? "border-2 border-dashed border-blue-400" : ""
            }`}
            style={{ height: "calc(100vh - 4rem - 56px - 16px)" }}
          >
            {children}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onClick={handleNewFolder}>새 폴더</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
