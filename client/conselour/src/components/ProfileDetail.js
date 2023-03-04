import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileDetail() {
  return (
    <div className="px-8 p-10 ">
      <div className="flex items-center gap-8">
        <Link href="/" >
        <Icon path={mdiArrowLeft} size={0.8} />
        </Link>
        <h1 className='text-primary text-xl font-semibold'>Profile</h1>
      </div>
      <div className="mt-10">
        <div className="relative mx-auto w-48 h-48 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <Image src="/Image/thinking.png" height={200} width={200} />
        </div>
        <div className="space-y-8 mt-10 text-center">

          <div className="space-y-4">
            <p className="text-primary">Name</p>
            <p className="text-base">Muhammad Jawahiruzzamans</p>
          </div>
          <div className="space-y-4">
            <p className="text-primary">Email</p>
            <p className="text-base">admin@admin.com</p>
          </div>
          <div className="space-y-4">
            <p className="text-primary">Gender</p>
            <p className="text-base">Laki laki</p>
          </div>
          <div className="space-y-4">
            <p className="text-primary">Date of birthday</p>
            <p className="text-base">20 agustus 200</p>
          </div>

        </div>
      </div>
    </div>
  )
}
