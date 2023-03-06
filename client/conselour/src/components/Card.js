import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <Link href="/chat/1" className="flex border-b-2 w-full text-left items-center justify-between px-8 hover:bg-slate-100 py-5 cursor-pointer">
      <div className="flex gap-4">
        <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <Image alt="user-img" src="/Image/thinking.png" height={200} width={200} />
        </div>
        <div >
          <h4 className="font-semibold text-base">Sulkhan Galang</h4>
          <p className=" font-extralight opacity-90">Hallo syaa sulkhan ngabs</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center ">
        <p className="bg-primary p-0.5 px-1.5 text-center text-xs rounded-full text-white">1</p>
        <p className="!text-xs opacity-50">Yesterday</p>
      </div>
    </Link>
  )
}
