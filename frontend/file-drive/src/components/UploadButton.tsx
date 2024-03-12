import { useRef } from "react";
import { handler as fileUpload } from "@/actions/file/upload";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";
import { useSearchParams } from "react-router-dom";

export default function UploadButton() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files?.length === 0) return;

    toggleLoading(true);
    const folderId = (searchParams.get("folderId") || 1) as number;
    const result = await fileUpload({ file: target.files[0], folderId });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    }
    toggleLoading(false);
  };

  return (
    <>
      <input
        ref={ref}
        type='file'
        className='invisible'
        onChange={handleUpload}
      />
      <Button size='sm' className='break-keep' onClick={handleClick}>
        업로드
      </Button>
    </>
  );
}
