import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Navigation />

      <main className='ml-12 px-4'>
        <Outlet />
      </main>

      <LoadingSpinner />
      <Toaster richColors position='top-center' />
    </>
  );
}
