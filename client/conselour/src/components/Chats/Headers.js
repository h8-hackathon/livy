import Image from "next/image";

export default function Headers() {
  return (
    <div className="p-5 px-10 flex items-center border-b-2 gap-5">
      <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <Image src="/Image/thinking.png" height={200} width={200} />
      </div>
      <div>
        <h4 className="font-semibold text-xl">Sulkhan Galang</h4>
        <p className=" opacity-50">Online</p>
      </div>
    </div>
  )
}
