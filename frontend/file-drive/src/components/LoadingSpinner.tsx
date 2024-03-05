import { useLoadingSpinner } from "@/hook/useLoadingSpinner";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  const isOpen = useLoadingSpinner((state) => state.isOpen);

  return (
    <div
      className={cn(
        "fixed top-0 flex-col justify-center w-screen h-screen items-center bg-black/80",
        isOpen ? "flex" : "hidden"
      )}
      style={{ zIndex: "99" }}
    >
      <Loader2 className='h-32 w-32 animate-spin text-indigo-500' />
    </div>
  );
};
