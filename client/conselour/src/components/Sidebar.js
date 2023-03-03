import Card from "./Card";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className='w-2/6 flex flex-col bg-green-50 h-screen  '>
      <div className="p-8 ">
        <div className="flex justify-between items-center">
          <h1 className='text-primary text-3xl font-bold'>Chats</h1>
          <div className="relative w-11 h-11 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <Image src="/Image/thinking.png" height={200} width={200} />
          </div>
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
    </div>
  )
}
