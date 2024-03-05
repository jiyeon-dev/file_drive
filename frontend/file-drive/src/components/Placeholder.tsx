import { UploadCloudIcon } from "lucide-react";
import UploadButton from "./UploadButton";

export default function Placeholder() {
  return (
    <div className='flex flex-col gap-8 w-full h-full items-center justify-center'>
      <UploadCloudIcon size={80} />
      <div className='text-xl'>파일이 없습니다.</div>
      <UploadButton />
    </div>
  );
}
