import { z } from "zod";
import { useForm } from "react-hook-form";
import { Folder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFolderEditorDialog } from "@/hook/useFolderEditorDialog";
import {
  FolderCreateSchema,
  handler as createFolder,
} from "@/actions/folder/create";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorResult, TwitterPicker } from "react-color";
import { useSearchParams } from "react-router-dom";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";

interface FolderEditDialog {
  folder?: Folder;
}

const DEFAULT_COLOR = "#abb8c3";

export default function FolderEditDialog({ folder }: FolderEditDialog) {
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const { toggle, isOpen } = useFolderEditorDialog((state) => ({
    toggle: state.toggle,
    isOpen: state.isOpen,
  }));
  const [searchParams] = useSearchParams();
  const folderId = (searchParams.get("folderId") || 1) as number;
  const isCreateMode = !folder;

  const form = useForm<z.infer<typeof FolderCreateSchema>>({
    resolver: zodResolver(FolderCreateSchema),
    defaultValues: {
      color: DEFAULT_COLOR,
      parent: folderId,
    },
  });

  // 색상 변경
  const handleChangeColor = (color: ColorResult) => {
    form.setValue("color", color.hex);
  };

  // 전송
  const onSubmit = async (values: z.infer<typeof FolderCreateSchema>) => {
    toggleLoading(true);
    const result = await createFolder(values);
    // TODO: 폴더 리스트 초기화
    if (result) {
      toggle(false);
    }
    toggleLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>폴더 {isCreateMode ? "생성" : "변경"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>폴더명</FormLabel>
                  <FormControl>
                    <Input placeholder='폴더명' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>색상</FormLabel>
                  <FormControl>
                    <>
                      <TwitterPicker
                        color={field.value}
                        onChangeComplete={handleChangeColor}
                        triangle='hide'
                      />
                      <input type='hidden' {...field} />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <input type='hidden' name='parent' value='1' />

            <DialogFooter className='sm:justify-end mt-3'>
              <DialogClose asChild>
                <Button type='button' variant='ghost'>
                  닫기
                </Button>
              </DialogClose>
              <Button type='submit'>생성</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
