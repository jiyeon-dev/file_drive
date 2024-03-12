import { UploadCloudIcon } from "lucide-react";
import UploadButton from "./UploadButton";
import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const showUploadButton = location.pathname === "/files";

  return (
    <div className='flex flex-col gap-8 w-full h-full items-center justify-center'>
      <UploadCloudIcon size={80} />
      <div className='text-xl'>파일이 없습니다.</div>

      {showUploadButton && <UploadButton />}
    </div>
  );
}
