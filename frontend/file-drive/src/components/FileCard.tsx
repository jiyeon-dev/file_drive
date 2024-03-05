import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { File } from "@/types";
import { formatRelative } from "date-fns";
import { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface FileCardProps {
  file: File;
}

export default function FileCard({ file }: FileCardProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const owner = file?.owner || {}; // 파일 소유주 정보
  const fileType = file.type;

  /**
   * 다운로드 URL
   * @param path 파일 경로 (full path)
   * @returns 다운로드 URL
   */
  const downloadURL = async (path: string) => {
    if (!path) return;
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    setImgUrl(url);
  };

  useEffect(() => {
    if (fileType === "IMAGE" && file.link) {
      downloadURL(file.link);
    }
  }, []);

  return (
    <Card>
      <CardHeader className='relative p-4'>
        <CardTitle className='flex gap-2 text-base font-normal'>
          <div className='flex justify-center'>
            <ImageIcon />
          </div>
          {file.name}
        </CardTitle>
        <div className='absolute top-2 right-2'>옵션</div>
      </CardHeader>
      <CardContent className='h-[200px] flex justify-center items-center'>
        {file.type === "IMAGE" && (
          <img
            alt={file.name}
            width='100%'
            src={imgUrl}
            className='rounded-sm'
            loading='lazy'
          />
        )}
      </CardContent>
      <CardFooter className='flex justify-between p-4'>
        <div className='flex gap-2 text-xs text-gray-700 w-40 items-center'>
          <Avatar className='w-6 h-6'>
            <AvatarFallback>
              {owner.name?.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {owner.name}
        </div>
        <div className='text-xs text-gray-700'>
          {formatRelative(file.uploadedAt, new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
