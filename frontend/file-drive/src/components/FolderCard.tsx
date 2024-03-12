import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder } from "@/types";
import { MoreVertical, FolderIcon, TrashIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import FolderDeleteDialog from "./FolderDeleteDialog";
import { useState } from "react";

export default function FolderCard({ folder }: { folder: Folder }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoToFolder = () => {
    navigate(location.pathname + "?folderId=" + folder.id);
  };

  return (
    <Card className='hover:shadow-md cursor-pointer'>
      <CardHeader className='relative p-4'>
        <CardTitle
          className='flex gap-3 text-base font-normal'
          onClick={handleGoToFolder}
        >
          <FolderIcon
            fill={folder.color || "#fff"}
            stroke={folder.color || "#000"}
          />
          {folder.name}
        </CardTitle>
        <div className='absolute top-2 right-2'>
          <FolderCardActions folderId={folder.id} />
        </div>
      </CardHeader>
    </Card>
  );
}

const FolderCardActions = ({ folderId }: { folderId: number }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
            <div className='flex gap-1 text-red-600 items-center cursor-pointer'>
              <TrashIcon className='w-4 h-4' /> 삭제
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FolderDeleteDialog
        open={openDeleteDialog}
        folderId={folderId}
        setOpen={setOpenDeleteDialog}
      />
    </>
  );
};
