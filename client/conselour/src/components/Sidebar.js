import Card from "./Card";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="p-8 ">
        <div className="flex justify-between items-center">
          <h1 className='text-primary text-xl font-semibold'>Chats</h1>
          <Link href="/profile" className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <Image src="/Image/thinking.png" height={200} width={200} alt="profile-img" />
          </Link>
        </div>
        <div className="border-1 mt-8 border h-fit bg-white py-3 px-5 rounded-md">
          <input type="text" className="w-full h-full outline-none" />
        </div>
      </div>
      <div className="overflow-auto scroll-smooth">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}
