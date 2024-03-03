import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";

export default function Navigation() {
  return (
    <div className='h-16 flex justify-center items-center space-x-10 border-b'>
      <NavButton link='/files' title='전체 파일'>
        <FileIcon />
      </NavButton>
      <NavButton link='/favorites' title='좋아요'>
        <StarIcon />
      </NavButton>
      <NavButton link='/trash' title='휴지통'>
        <TrashIcon />
      </NavButton>
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
