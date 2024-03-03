import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />

      <Toaster richColors position='top-center' />
    </>
  );
}
