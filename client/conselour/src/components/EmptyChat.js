import Image from 'next/image'

export default function EmptyChat({ title, subtitle }) {
  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <Image alt='img-not-started' src="/Image/thinking.png" width={150} height={150} />
      <h1 className='mt-5 font-medium text-lg'>{title || 'Let\'s start conversation'}</h1>
      <p className='mt-1 text-base'>{subtitle || 'Come on check schedule and let\'s start conversation'}</p>
    </div>
  )
}
