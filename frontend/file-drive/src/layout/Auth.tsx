import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  return (
    <>
      <main className='h-screen overflow-y-auto'>
        <div className='grid place-content-center h-screen'>
          {/* body */}
          <div className='sm:w-96 w-80 border p-4 rounded-xl shadow-sm relative'>
            <Outlet />
          </div>
        </div>
      </main>

      <Toaster richColors position='top-center' />
    </>
  );
}
