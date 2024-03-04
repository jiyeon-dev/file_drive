import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navigation() {
  return (
    <div className='fixed top-0 pt-24 bg-background flex flex-col items-center space-y-6 w-12 h-screen border-r'>
      <NavButton link='/files' title='전체 파일'>
        <FileIcon />
      </NavButton>
      <NavButton link='/favorites' title='좋아요'>
        <StarIcon />
      </NavButton>
      <NavButton link='/trash' title='휴지통'>
        <TrashIcon />
      </NavButton>

      <Avatar className='absolute bottom-8'>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

const NavButton = ({
  title,
  link,
  children,
}: {
  title?: string;
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <Button variant='ghost' title={title} className='text-md'>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? "text-indigo-400" : undefined)}
      >
        {children}
      </NavLink>
    </Button>
  );
};
