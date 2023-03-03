import Card from "./Card";

export default function Sidebar() {
  return (
    <div className='w-2/6 flex flex-col bg-green-50 h-screen  '>
      <div className="p-8 ">
        <h1 className='text-primary text-3xl font-bold'>Chats</h1>
        <div className="border-1 mt-8 border h-fit bg-white py-3 px-5 rounded-md">
          <input type="text" className="w-full h-full outline-none" />
        </div>
      </div>
      <div className="overflow-auto scroll-smooth">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}
