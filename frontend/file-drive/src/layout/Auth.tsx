import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const title = pathname === "/signup" ? "회원가입" : "로그인";

  return (
    <>
      <main className='h-screen overflow-y-auto'>
        <div className='grid place-content-center h-screen'>
          {/* body */}
          <div className='sm:w-96 w-80 border p-4 rounded-xl shadow-sm relative'>
            <div className='flex flex-col items-center'>
              <h1 className='text-3xl font-bold text-indigo-600 my-6'>
                {title}
              </h1>
            </div>
            <Outlet />
          </div>
        </div>
      </main>

      <Toaster richColors position='top-center' />
    </>
  );
}
