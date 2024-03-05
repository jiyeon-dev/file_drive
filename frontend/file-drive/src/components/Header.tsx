import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadButton from "./UploadButton";

export default function Header() {
  return (
    <header className='sticky top-0 bg-background z-10 border-b h-16 flex justify-between space-x-2 sm:grid grid-cols-3 px-4'>
      <div className='flex items-center space-x-2'>
        <UploadCloudIcon size={28} className='' />
        <h1 className='text-xl sm:text-2xl font-bold hidden sm:block'>
          FileDrive
        </h1>
      </div>
      <div className='flex space-x-1 items-center'>
        <Input placeholder='파일명'></Input>
        <Button size='sm' className='break-keep'>
          검색
        </Button>
      </div>
      <div className='flex items-center justify-end'>
        <UploadButton />
      </div>
    </header>
  );
}
