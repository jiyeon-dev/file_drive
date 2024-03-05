/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GridIcon, RowsIcon } from "lucide-react";
import DnDZone from "./DnDZone";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/authFetch";
import { File, Page, Response } from "@/types";
import { toast } from "sonner";
import FileCard from "./FileCard";

export default function FileTabs() {
  const [type, setType] = useState<string>("all");

  // 파일/폴더 리스트 조회
  const { data, isError, error, isFetching } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["files"],
    queryFn: fetchFiles,
    getNextPageParam: (data) => {
      // 마지막 페이지가 아니면 페이지 번호 + 1
      if (data.last) return null;
      else return data.number + 1;
    },
    retry: 1,
  });

  console.log(data);

  if (isError) {
    toast.error(error.message, { id: "files" });
  }

  return (
    <div>
      <Tabs defaultValue='grid'>
        <div className='flex justify-between items-center sticky top-16 pt-4 bg-background z-10'>
          <TabsList>
            <TabsTrigger value='grid' className='flex gap-2 items-center'>
              <GridIcon /> <span className='hidden sm:block'>Grid</span>
            </TabsTrigger>
            <TabsTrigger value='table' className='flex gap-2 items-center'>
              <RowsIcon /> <span className='hidden sm:block'>Table</span>
            </TabsTrigger>
          </TabsList>

          <div className='flex gap-2 items-center'>
            <Select value={type} onValueChange={(type) => setType(type)}>
              <SelectTrigger id='type-select' className='w-[120px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* loading */}
        {isFetching && <>Loading</>}
        {/* placeholder */}

        <DnDZone>
          <TabsContent value='grid'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {data?.pages.map((page) => {
                return page.content.map((file: File) => (
                  <FileCard key={file.id} file={file} />
                ));
              })}
            </div>
          </TabsContent>
          <TabsContent value='table'>table</TabsContent>
        </DnDZone>
      </Tabs>
    </div>
  );
}

/**
 * 파일 리스트 조회
 * @param param0 페이지 번호
 * @returns
 */
const fetchFiles = async ({ pageParam = 0 }: { pageParam: number }) => {
  const response = await authFetch(
    `/api/file?pageNo=${pageParam}&folderId=${1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = (await response?.json()) as Response<Page<File>>;
  if (!result.resultStatus.isSuccess) {
    throw new Error(result.resultStatus.resultMessage);
  }

  return result.resultData;
};
