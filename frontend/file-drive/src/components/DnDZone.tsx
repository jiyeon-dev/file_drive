import { handler as fileUpload, toast_id } from "@/actions/file/upload";
import { MESSAGE } from "@/lib/message";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function DnDZone({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["files"] });
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
      className={`my-2 border rounded-md px-2 mb-2 overflow-x-auto ${
        dragOver ? "border-2 border-dashed border-blue-400" : ""
      }`}
      style={{ height: "calc(100vh - 4rem - 56px - 16px)" }}
    >
      {children}
    </div>
  );
}
