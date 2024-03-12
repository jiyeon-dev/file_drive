import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GridIcon, RowsIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/authFetch";
import { File, Page, Response } from "@/types";
import { toast } from "sonner";
import FileCard from "./FileCard";
import Placeholder from "./Placeholder";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";
import { useSearchParams } from "react-router-dom";

export default function NoDnDFileTabs() {
  const target = useRef<HTMLDivElement>(null);
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const [searchParams] = useSearchParams();

  // 파일/폴더 리스트 조회
  const { data, isError, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 0,
      queryKey: ["trash", Object.fromEntries(searchParams)],
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
        </div>

        <TabsContent value='grid' className='my-2 space-y-2'>
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
        {isEmpty && (
          <div className='mt-20 px-2 mb-2 overflow-x-auto'>
            <Placeholder />
          </div>
        )}
      </Tabs>
    </div>
  );
}

/**
 * 삭제 파일 리스트 조회
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
  let searchTerm = "";
  if (typeof queryKey[1] === "object") {
    // 검색어 조건
    if (!queryKey[1].searchTerm || queryKey[1].searchTerm === "")
      searchTerm = "";
    else searchTerm = "&searchTerm=" + queryKey[1].searchTerm;
  }

  const response = await authFetch(
    `/api/file/delete?pageNo=${pageParam}${searchTerm}`,
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
