import { handler as fileUpload, toast_id } from "@/actions/file/upload";
import { MESSAGE } from "@/lib/message";
import { useState } from "react";
import { toast } from "sonner";

export default function DnDZone({ children }: { children: React.ReactNode }) {
  const [dragOver, isDragOver] = useState(false);

  const dropHandler = async (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 1) {
      toast.warning(MESSAGE.EF02, toast_id);
      return;
    }

    const result = await fileUpload({ file: files[0], folderId: 1 });
    if (result) {
      // TODO: tanstack 쿼리 재검색
    }
  };

  const dragoverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(true);
  };
  const dragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    isDragOver(false);
  };

  return (
    <div
      onDrop={dropHandler}
      onDragOver={dragoverHandler}
      onDragLeave={dragLeaveHandler}
      className={`my-2 border rounded-md px-2 ${
        dragOver && "border-2 border-dashed border-blue-400"
      }`}
      style={{ height: "calc(100vh - 4rem - 56px - 16px)" }}
    >
      {children}
    </div>
  );
}
