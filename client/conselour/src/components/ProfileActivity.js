import { api } from "@/helpers";
import { useCounselor } from "@/hooks/useCounselor";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileActivity() {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const hours = Array.from(Array(24)).fill(null).map((value, index) => `${index < 9 ? '0' : ''}${index + 1}:00`)
  const [available, setAvailable] = useState([])
  const [rate, setRate] = useState(0)
  const [submissions, setSubmissions] = useState("")
  const { counselor } = useCounselor()

  const addDays = () => {
    setAvailable((available) => {
      return [
        ...available,
        {
          dayOfWeek: 'monday',
          slots: {
            startTime: '09:00',
            endTime: '09:00',
          }
        }
      ]
    })
  }

  const handlerChange = (index, key) => {
    if (key == 'dayOfWeek') {
      return (e) => {
        setAvailable((available) => {
          available[index].dayOfWeek = e.target.value
          return available
        })
      }
    }
    return (e) => {
      setAvailable((available) => {
        available[index].slots[key] = e.target.value
        return available
      })
    }
  }

  useEffect(() => {
    api.get('/counselor/availability').then(({ data }) => {
      const { availability, counselor } = data
      const result = []
      availability.availability.forEach(a => {
        a.slots.forEach(({ startTime, endTime }) => {
          result.push({
            dayOfWeek: a.dayOfWeek,
            slots: {
              startTime, endTime
            }
          })
        });
      })
      setAvailable(result)
      setRate(counselor.rate)
      setSubmissions(counselor.submissions)
    })
  }, [])

  const submit = async (e) => {
    e.preventDefault();
    console.log(available)

    const result = available.reduce((a, current) => {
      if (!a[current.dayOfWeek]) a[current.dayOfWeek] = []
      a[current.dayOfWeek].push(current.slots)
      return a
    }, {})

    const res = Object.keys(result).map(key => { return { dayOfWeek: key, slots: result[key] } })
    
    await api.post('/counselor/availability', { availability: res, submission: { rate, submissions } })
  }

  return (
    <div className="px-8 p-10 overflow-auto h-full">
      <div className="flex gap-8 items-center">
        <Link href="/profile" >
          <Icon path={mdiArrowLeft} size={0.8} />
        </Link>
        <h1 className='text-primary text-xl font-semibold'>Submission</h1>
      </div>
      <form onSubmit={submit} className="space-y-8 flex flex-col justify-center h-full  flex-1">
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">Hourly Rate</p>
          <input value={rate} onChange={(e) => setRate(e.target.value)} name="name" type="number" className="px-3 py-2 w-full text-xs outline-none resize" required />
        </div>
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">Submission</p>
          <textarea value={submissions} onChange={(e) => setSubmissions(e.target.value)} className="px-3 w-full py-2 text-xs outline-none" rows="4" type="email" required  ></textarea>
        </div>
        <div className="space-y-2 w-3/4 mx-auto">
          <p className="text-primary">Availibity</p>
          {available.map((item, index) =>
            <div key={index} className="space-x-2 w-full">
              <select defaultValue={item.dayOfWeek} onChange={handlerChange(index, 'dayOfWeek')} name="gender" className="capitalize px-3 py-2 text-xs outline-none"  >
                {days.map((day, index) =>
                  <option key={index}>{day}</option>
                )}
              </select>
              <select defaultValue={item.slots.startTime} onChange={handlerChange(index, 'startTime')} name="startTime" className="capitalize px-3 py-2 text-xs outline-none"  >
                {hours.map((day, index) =>
                  <option key={index}>{day}</option>
                )}
              </select>
              <span>to</span>
              <select defaultValue={item.slots.endTime} onChange={handlerChange(index, 'endTime')} name="endTime" className="capitalize px-3 py-2 text-xs outline-none"  >
                {hours.map((day, index) =>
                  <option key={index} value={day}>{day}</option>
                )}
              </select>
            </div>
          )}
          <button onClick={addDays} type="button" className="bg-slate-200 px-3 py-2 rounded text-xs">
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
