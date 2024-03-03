import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-indigo-600 my-6'>로그인</h1>
      </div>
      <SignInForm />
    </>
  );
}
