import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Navigation />

      <main className='ml-12 p-4'>
        <Outlet />
      </main>

      <Toaster richColors position='top-center' />
    </>
  );
}
