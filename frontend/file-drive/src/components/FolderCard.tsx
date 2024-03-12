import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder } from "@/types";
import { FolderIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FolderCard({ folder }: { folder: Folder }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoToFolder = () => {
    navigate(location.pathname + "?folderId=" + folder.id);
  };

  return (
    <Card className='hover:shadow-md cursor-pointer' onClick={handleGoToFolder}>
      <CardHeader className='relative p-4'>
        <CardTitle className='flex gap-3 text-base font-normal'>
          <FolderIcon
            fill={folder.color || "#fff"}
            stroke={folder.color || "#000"}
          />
          {folder.name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
