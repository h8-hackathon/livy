import { api, formatedDate } from "@/helpers";
import { useCounselor } from "@/hooks/useCounselor";
import { mdiArrowLeft, mdiPower } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileDetail() {
  const [edit, setEdit] = useState(false)
  const { counselor, setCounselor } = useCounselor()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  const inputHandler = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleEdit = () => {
    if (edit) setForm({})
    else setForm({ ...counselor, dob: formatedDate(counselor.dob) })
    setEdit(!edit)
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await api.put('/counselor', { ...form, dob: new Date(form.dob).toISOString() })
      setEdit(false)
      setCounselor(form)
      toast.success('Successfully updated')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Errror')
    } finally { setLoading(false) }
  }
  return (
    <div className="px-8 p-10 overflow-auto">
      <div className="flex gap-8 items-center">
        <Link href="/" >
          <Icon path={mdiArrowLeft} size={0.8} />
        </Link>
        <h1 className='text-primary text-xl font-semibold'>Profile</h1>
      </div>
      <div className="mt-10">
        <div className="relative mx-auto w-48 h-48 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img alt="profile-img" src={counselor.image} height={200} width={200} />
        </div>
        <form onSubmit={submit} className="space-y-8 mt-10 text-center">
          <div className="space-x-2">
            <Link href="/profile/activity" className="bg-primary px-5 py-2 rounded text-xs text-white">Edit Activity</Link>
            <button type="button" onClick={handleEdit} className="bg-slate-200 px-3 py-2 rounded text-xs">
              {!edit ? 'Edit Profile' : 'Cancel'}
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-primary">Name</p>
            {edit ? <input name="name" onChange={inputHandler} value={form.name} type="text" className="px-3 py-2 text-xs w-3/4 outline-none required " /> : <p className="text-base">{counselor.name || 'Not set'}</p>}
          </div>
          <div className="space-y-1">
            <p className="text-primary">Email</p>
            {edit ? <input name="email" disabled onChange={inputHandler} value={form.email} className="px-3 py-2 text-xs w-3/4 outline-none" type="email" required /> : <p className="text-base">{counselor.email || 'Not set'}</p>}
          </div>
          <div className="space-y-1">
            <p className="text-primary">Gender</p>
            {
              edit ?
                <select name="gender" onChange={inputHandler} value={form.gender || ""} className="px-3 py-2 text-xs w-3/4 outline-none" type="text" >
                  <option disabled value="" >Not set</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                : <p className="text-base">{counselor.gender || 'Not set'}</p>}
          </div>
          <div className="space-y-4">
            <p className="text-primary">Date of birthday</p>
            {edit ? <input name="dob" onChange={inputHandler} value={form.dob} className="px-3 py-2 text-xs w-3/4 outline-none" type="date" /> : <p className="text-base">{formatedDate(counselor.dob) || 'Not set'}</p>}
          </div>
          {
            edit && <button type="submit" disabled={loading} className={`bg-primary disabled:bg-slate-500 text-white px-3 py-2 rounded text-xs w-3/4`}>Submit</button>
          }
        </form>
      </div>
    </div>
  )
}
