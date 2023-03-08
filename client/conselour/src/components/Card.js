import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Card({ item }) {
  const router = useRouter()
  const move = () => {
    if (item.status !== 'active') {
      return toast.warning(`Session ${item.status == 'past' ? 'has ended' : 'not started' }`)
    }
    router.push(`/chat/${item.User?.id}`)
  }
  return (
    <button onClick={move} className="flex border-b-2 w-full text-left items-center justify-between px-8 disabled:cursor-default hover:bg-slate-100 py-5 cursor-pointer">
      {/* <Link prefetch={true} href={}> */}
      <div className="flex gap-4">
        <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img alt="user-img" src={item.User?.image} height={200} width={200} />
        </div>
        <div >
          <h4 className="font-semibold text-base">{item.User?.name}</h4>
          <p className=" font-extralight opacity-90">{new Date(item.session).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center ">
        {/* <p className="bg-primary p-0.5 px-1.5 text-center text-xs rounded-full text-white">1</p> */}
        <p className="!text-xs opacity-50">{new Date(item.session).toLocaleString('id-ID', {
          hour: "numeric",
          minute: "numeric"
        })}</p>
      </div>
      {/* </Link> */}
    </button>
  )
}
