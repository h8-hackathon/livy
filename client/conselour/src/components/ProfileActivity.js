import { api } from "@/helpers";
import { useCounselor } from "@/hooks/useCounselor";
import { mdiArrowLeft, mdiDelete, mdiPower } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileActivity({ pending }) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const hours = Array.from(Array(24)).fill(null).map((_, index) => `${index < 9 ? '0' : ''}${index + 1}:00`)
  const [available, setAvailable] = useState([])
  const [rate, setRate] = useState(0)
  const [submissions, setSubmissions] = useState("")
  const { setCounselor } = useCounselor()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

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
      setSubmissions(counselor.submissions || '')
    })
      .catch(error => toast.error(error.response.data.message))
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    localStorage.clear()
    setCounselor(null)
    router.push('/login')
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = available.reduce((a, current) => {
        if (!a[current.dayOfWeek]) a[current.dayOfWeek] = []
        a[current.dayOfWeek].push(current.slots)
        return a
      }, {})

      const res = Object.keys(result).map(key => { return { dayOfWeek: key, slots: result[key] } })

      await api.post('/counselor/availability', { availability: res, submission: { rate, submissions } })
      toast.success('Successfully updated')
    } catch (error) {
      toast.success(error.response.data.message)
    } finally{
      setLoading(false)
    }
  }

  const deleteAvailable = (index) => {
    var array = [...available];

    array.splice(index, 1);
    setAvailable(array);
  }

  return (
    <>
      <div className="px-8 p-10 flex items-center justify-between">
        <div className="flex gap-8 items-center">
          {!pending &&
            <Link href="/profile" >
              <Icon path={mdiArrowLeft} size={0.8} />
            </Link>
          }
          <h1 className='text-primary text-xl font-semibold'>Submission</h1>
        </div>
        {pending &&
          <button onClick={logout}>
            <Icon path={mdiPower} size={1.1} className="text-primary" />
          </button>
        }
      </div>
      <form onSubmit={submit} className="overflow-auto space-y-8 h-full mt-5">
        <div className="space-y-2 w-3/4 mx-auto ">
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
            <div key={index} className="space-x-2 w-full ">
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
              <button type="button" onClick={() => deleteAvailable(index)} className="align-middle text-red-500">
                <Icon size={0.9} path={mdiDelete} />
              </button>
            </div>
          )}
          <button onClick={addDays} type="button" className="bg-slate-200 px-3 py-2 rounded text-xs">
            + Add Days
          </button>
        </div>
        <div className=" w-3/4 mx-auto">
          <button type="submit" disabled={loading} className="disabled:bg-slate-500 bg-primary mx-auto text-white px-3 py-2 rounded text-xs w-full">Edit</button>
        </div>
      </form>
    </>
  )
}
