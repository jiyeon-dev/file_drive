import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-indigo-600 my-6'>회원가입</h1>
      </div>
      <SignUpForm />
    </>
  );
}
