import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { handler as folderDelete } from "@/actions/folder/delete";
import { useLoadingSpinner } from "@/hook/useLoadingSpinner";

interface FolderDeleteDialog {
  open: boolean;
  setOpen: (value: boolean) => void;
  folderId: number;
}

export default function FolderDeleteDialog({
  open,
  setOpen,
  folderId,
}: FolderDeleteDialog) {
  const toggleLoading = useLoadingSpinner((state) => state.toggle);
  const queryClient = useQueryClient();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    toggleLoading(true);
    const result = await folderDelete({
      folderId,
    });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setOpen(false);
    }
    toggleLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            폴더를 삭제하시면 해당 폴더에 속한 파일과 폴더들은 모두 상위 폴더로
            이동됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니요</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>네</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
