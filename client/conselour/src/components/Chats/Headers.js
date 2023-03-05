import Image from "next/image";

export default function Headers() {
  return (
    <div className="p-4 px-10 flex items-center border-b-2 gap-5">
      <div className="relative w-11 h-11 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <Image alt="user-img" src="/Image/thinking.png" height={200} width={200} />
      </div>
      <div >
        <h4 className="font-semibold text-base">Sulkhan Galang</h4>
        <p className="text-xs opacity-50">Online</p>
      </div>
    </div>
  )
}
