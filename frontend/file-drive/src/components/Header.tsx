import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UploadCloudIcon } from "lucide-react";

export default function Header() {
  return (
    <header className='sticky border-b h-20 grid grid-cols-3 p-4'>
      <div className='flex items-center space-x-2'>
        <UploadCloudIcon size={28} />
        <h1 className='text-2xl font-bold'>FileDrive</h1>
      </div>
      <div></div>
      <div className='flex items-center justify-end'>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
