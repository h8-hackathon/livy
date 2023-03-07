import Card from "./Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/helpers";
import { useCounselor } from "@/hooks/useCounselor";
import { toast } from 'react-toastify';

export default function Sidebar() {
  const [schedules, setSchedules] = useState()
  const { counselor } = useCounselor()

  useEffect(() => {
    api.get('/counselor/chats').then(({ data }) => {
      setSchedules(data)
    }).catch(error => toast.error(error.response.data.message))
  }, [])

  return (
    <>
      <div className="px-8 py-5 ">
        <div className="flex justify-between items-center">
          <h1 className='text-primary text-xl font-semibold'>Chats</h1>
          <Link href="/profile" className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <img src={counselor.image} height={200} width={200} alt="profile-img" />
          </Link>
        </div>
        <div className="border-1 mt-8 border h-fit bg-white py-2 px-3 text-sm rounded-md">
          <input type="search" placeholder="Search" className="w-full h-full outline-none text-xs" />
        </div>
      </div>
      <div className="overflow-auto scroll-smooth">
        {schedules && schedules.map((item, index) =>
          <Card key={index} item={item} />
        )}
      </div>
    </>
  )
}
