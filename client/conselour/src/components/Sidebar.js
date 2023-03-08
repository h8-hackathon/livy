import Card from "./Card";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api, groupingSchedule } from "@/helpers";
import { useCounselor } from "@/hooks/useCounselor";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

export default function Sidebar() {
  const [schedules, setSchedules] = useState([])
  const [temp, setTemp] = useState([])
  const { counselor, setCounselor } = useCounselor()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('active')
  const stat = ['active', 'upcoming', 'unpaid', 'past']

  const router = useRouter()

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 60000)

    return () => clearInterval(intervalId);
  }, [])

  const fetchData = () => {
    api.get('/counselor/chats').then(({ data }) => {
      setSchedules(data)
      setTemp(data)
    })
      .catch(error => toast.error(error.response?.data?.message || 'Internal Server Error'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (search) {
      const tmp = schedules?.filter(el => el.User?.name.toLowerCase().includes(search.toLowerCase()))
      setTemp(tmp)
    } else {
      setTemp(schedules)
    }
  }, [search])

  const groupped = useCallback(() => groupingSchedule(temp), [temp])

  const logout = () => {
    localStorage.clear()
    setCounselor(null)
    router.push('/login')
    toast.success('Logout Successfully')
  }

  return (
    <>
      <div className="px-8 py-5 ">
        <div className="flex justify-center items-center flex-col gap-2">
          <Link href="/profile" className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <img src={counselor.image} height={200} width={200} alt="profile-img" />
          </Link>
          <div className="space-x-2">
            <Link href="/profile/" className="bg-primary px-5 py-1 rounded text-xs text-white">Profile</Link>
            <button onClick={logout} type="button" className="bg-slate-200 px-3 py-1 rounded text-xs">
              Logout
            </button>
          </div>
        </div>
        <div className="border-1 mt-8 border h-fit bg-white py-2 px-3 text-sm rounded-md">
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" className="w-full h-full outline-none text-xs" />
        </div>
      </div>
      <div className="text-xs font-semibold text-center text-gray-500 border-b border-gray-200 ">
        <ul className="flex overflow-auto  z-0  -mb-px">
          {stat && stat.map((stat) =>
            <li key={stat} className="mr-2">
              <button onClick={() => setGroup(stat)} className={`capitalize inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary ${group == stat ? 'text-primary border-primary' : ''}`}>{stat}</button>
            </li>)}
        </ul>
      </div>
      <div className="overflow-auto scroll-smooth">
        {groupped()[group].length !== 0 && !loading &&
          groupped()[group].map((item, index) =>
            <Card key={index} item={item} />
          )}

        {!groupped()[group].length && !loading &&
          <p className="text-center mt-10">No Data Record</p>
        }

        {loading && Array.from(Array(5), (e, i) => {
          return <div key={i} className="flex border-b-2 w-full  items-center justify-between px-8 py-5 ">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12  rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-3 bg-slate-200 animate-pulse" />
                <div className="w-28 h-2 bg-slate-200 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-end justify-center ">
              <p className="opacity-50 w-24 h-3 bg-slate-200 animate-pulse" />
            </div>
          </div>
        })}
      </div>
    </>
  )
}
