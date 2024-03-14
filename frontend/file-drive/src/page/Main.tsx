import { UploadCloudIcon } from "lucide-react";

export default function MainPage() {
  return (
    <div className='container flex flex-col items-center justify-center my-10 h-[100%] space-y-5'>
      <h1 className='text-3xl text-bold'>
        파일을 올려 다른 사람들과 공유해보세요!
      </h1>

      <div className=''>
        <UploadCloudIcon size={100} />
      </div>
    </div>
  );
}
