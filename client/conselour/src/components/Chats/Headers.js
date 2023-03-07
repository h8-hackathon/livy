export default function Headers({ user, loading }) {
  if (!user || loading) return (
    <div className="flex p-4 px-10 items-center gap-5 border-b-2">
      <div className="w-12 h-12  rounded-full bg-gray-200 animate-pulse" />
      <div className="w-32 h-4 bg-slate-200 animate-pulse" />
    </div>
  )
  return (
    <div className="p-4 px-10 flex items-center border-b-2 gap-5">
      <div className="relative w-11 h-11 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <img alt="user-img" src={user.image} height={200} width={200} />
      </div>
      <div >
        <h4 className="font-semibold text-base">{user?.name}</h4>
        {/* <p className="text-xs opacity-50">Online</p> */}
      </div>
    </div>
  )
}
