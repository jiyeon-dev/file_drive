import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function FileCard() {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<string, React.ReactNode>;

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-2 text-base font-normal'>
          <div className='flex justify-center'>{typeIcons[file.type]}</div>{" "}
          {file.name}
        </CardTitle>
        <div className='absolute top-2 right-2'>fav</div>
      </CardHeader>
      <CardContent className='h-[200px] flex justify-center items-center'>
        {/* {file.type === "image" && (
          <Image
            alt={file.name}
            width='200'
            height='100'
            src={getFileUrl(file.fileId)}
          />
        )}
        {file.type === "csv" && <GanttChartIcon className='w-20 h-20' />}
        {file.type === "pdf" && <FileTextIcon className='w-20 h-20' />} */}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex gap-2 text-xs text-gray-700 w-40 items-center'>
          <Avatar className='w-6 h-6'>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* {userProfile?.name} */}
        </div>
        <div className='text-xs text-gray-700'>Uploaded on</div>
      </CardFooter>
    </Card>
  );
}
