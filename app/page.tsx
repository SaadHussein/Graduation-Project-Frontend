import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-[100vh] flex-col text-center px-2">
      <div className="absolute flex items-center justify-center top-5 left-5 gap-2">
        <Image src="/Logo.png" alt="Logo" width={40} height={40}></Image>
        <Image src="/XFit.png" alt="Logo" width={40} height={40}></Image>
      </div>
      <h1 className="sm:text-[52px] text-[40px] mb-5">Welcome To X-Fit.</h1>
      <h2 className="sm:text-[30px] text-[20px]">
        To Start Using Our Application, Please Sign in or Create Account First{" "}
        <Link href="/signin" className="text-blue-600 font-semibold">
          From Here
        </Link>
      </h2>
    </div>
  );
}
