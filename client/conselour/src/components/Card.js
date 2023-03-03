import Image from "next/image";

export default function Card() {
  return (
    <button className="flex border-b-2 w-full text-left items-center justify-between px-8 hover:bg-slate-100 py-6 cursor-pointer">
      <div className="flex gap-4">
        <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <Image src="/Image/thinking.png" height={200} width={200} />
        </div>
        <div>
          <h4 className="font-semibold text-xl">Sulkhan Galang</h4>
          <p className=" opacity-50">Hallo syaa sulkhan ngabs</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1 ">
        <p className="bg-primary h-6 w-6 text-center rounded-full text-white">1</p>
        <p className=" opacity-50">Yesterday</p>
      </div>
    </button>
  )
}
