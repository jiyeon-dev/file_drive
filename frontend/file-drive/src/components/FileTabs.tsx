import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import DnDZone from "./DnDZone";
import { useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/lib/authFetch";
import { File, FileType, Page, Response } from "@/types";
import { toast } from "sonner";
import FileCard from "./FileCard";
import { useLoaderData } from "react-router-dom";
import Placeholder from "./Placeholder";
import useIntersectionObserver from "@/hook/useIntersectionObserver";

export default function FileTabs() {
  const queryClient = useQueryClient();
  const { fileTypes } = useLoaderData() as { fileTypes: FileType[] };
  const [type, setType] = useState<string>("all");
  const target = useRef<HTMLDivElement>(null);

  // 파일 타입 변경 이벤트
  const handleChangeFileType = (newType: string) => {
    queryClient.invalidateQueries({ queryKey: ["files"] });
    setType(newType);
  };

  // 파일/폴더 리스트 조회
  const { data, isError, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 0,
      queryKey: ["files", { type }],
      queryFn: ({ pageParam, queryKey }) => fetchFiles({ pageParam, queryKey }),
      getNextPageParam: (data) => {
        // 마지막 페이지가 아니면 페이지 번호 + 1
        if (data.last) return null;
        else return data.number + 1;
      },
      retry: 1,
    });

  if (isError) {
    toast.error(error.message, { id: "files" });
  }

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // 데이터가 없는지 체크
  const isEmpty = data?.pages[0].totalElements === 0;

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
            <Select
              value={type}
              onValueChange={(type) => handleChangeFileType(type)}
            >
              <SelectTrigger id='type-select' className='w-[150px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체</SelectItem>
                {fileTypes.map((type: FileType) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* loading */}
        {isFetching && (
          <div className='flex flex-col gap-8 w-full items-center mt-24'>
            <Loader2 className='h-32 w-32 animate-spin text-indigo-500' />
          </div>
        )}

        <DnDZone>
          {isEmpty && <Placeholder />}
          <TabsContent value='grid' className='my-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {data?.pages.map((page) => {
                return page.content.map((file: File) => (
                  <FileCard key={file.id} file={file} />
                ));
              })}
            </div>
            {hasNextPage && <div ref={target} />}
          </TabsContent>
          <TabsContent value='table' className='my-2'>
            table
            {hasNextPage && <div ref={target} />}
          </TabsContent>
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
const fetchFiles = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: (string | { type: string })[];
}) => {
  const searchFileType =
    typeof queryKey[1] === "object" ? queryKey[1].type : "all"; // 검색 조건 파일 타입
  const fileTypeUrl = searchFileType === "all" ? "" : `/${searchFileType}`; // 파일 타입 URL 생성

  const response = await authFetch(
    `/api/file${fileTypeUrl}?pageNo=${pageParam}&folderId=${1}`,
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
