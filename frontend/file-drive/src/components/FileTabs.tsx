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
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/lib/authFetch";
import { File, FileType, Page, Response } from "@/types";
import { toast } from "sonner";
import FileCard from "./FileCard";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Placeholder from "./Placeholder";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";

export default function FileTabs() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fileTypes } = useLoaderData() as { fileTypes: FileType[] };
  const target = useRef<HTMLDivElement>(null);
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const fileType = searchParams.get("type") || "all";

  // 파일 타입 변경 이벤트
  const handleChangeFileType = (newType: string) => {
    queryClient.invalidateQueries({ queryKey: ["files"] });
    searchParams.set("type", newType);
    setSearchParams(searchParams.toString());
  };

  // 파일/폴더 리스트 조회
  const { data, isError, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 0,
      queryKey: ["files", Object.fromEntries(searchParams)],
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

  // 로딩 바
  useEffect(() => {
    toggleLoading(isFetching);
  }, [isFetching]);

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
              value={fileType}
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
  queryKey: (string | { [key: string]: string })[];
}) => {
  let fileType,
    searchTerm = "";
  if (typeof queryKey[1] === "object") {
    // 파일 타입 조건
    if (!queryKey[1].type || queryKey[1].type === "all") fileType = "";
    else fileType = `/${queryKey[1].type}`;

    // 검색어 조건
    if (!queryKey[1].searchTerm || queryKey[1].searchTerm === "")
      searchTerm = "";
    else searchTerm = "&searchTerm=" + queryKey[1].searchTerm;
  }

  const response = await authFetch(
    `/api/file${fileType}?pageNo=${pageParam}&folderId=${1}${searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
  const result = (await response?.json()) as Response<Page<File>>;
  if (!result.resultStatus.isSuccess) {
    throw new Error(result.resultStatus.resultMessage);
  }

  return result.resultData;
};
