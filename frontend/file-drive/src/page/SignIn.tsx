import { toast_id } from "@/actions/auth/signIn";
import SignInForm from "@/components/SignInForm";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const errorParam = queryParams.get("error");

    if (errorParam) {
      setTimeout(() => toast.error(decodeURIComponent(errorParam), toast_id));
    }
  }, []);

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-indigo-600 my-6'>로그인</h1>
      </div>
      <SignInForm />
    </>
  );
}
