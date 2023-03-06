import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileActivity() {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const [available, setAvailable] = useState([])
  return (
    <div className="px-8 p-10 overflow-auto h-full">
      <div className="flex gap-8 items-center">
        <Link href="/profile" >
          <Icon path={mdiArrowLeft} size={0.8} />
        </Link>
        <h1 className='text-primary text-xl font-semibold'>Activity</h1>
      </div>
      <form className="space-y-8 flex flex-col justify-center h-full  flex-1">
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">Hourly Rate</p>
          <input name="name" type="text" className="px-3 py-2 w-full text-xs outline-none resize" required />
        </div>
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">About</p>
          <textarea name="email" className="px-3 w-full py-2 text-xs outline-none" rows="4" type="email" required  ></textarea>
        </div>
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">Availibity</p>
          <div className="space-x-2 w-full">
            <select name="gender" className="capitalize px-3 py-2 text-xs outline-none" type="text" >
              {days.map((day) =>
                <option value={day}>{day}</option>
              )}
            </select>
            <input type="time" className="px-3 py-2 text-xs  outline-none" />
            <span>to</span>
            <input type="time" className="px-3 py-2 text-xs  outline-none" />
          </div>
          <button type="button" className="bg-slate-200 px-3 py-2 rounded text-xs">
            + Add Days
          </button>
        </div>
        <div className=" w-3/4 mx-auto">
          <button type="submit" className="bg-primary mx-auto text-white px-3 py-2 rounded text-xs w-full">Edit</button>
        </div>
      </form>
    </div>
  )
}
