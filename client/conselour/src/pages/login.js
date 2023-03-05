import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter()

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      try {
        const res = await axios.post('https://api.livy.chat/login',
          {
            token: codeResponse.access_token,
            role: 'conselour'
          }
        )

        localStorage.setItem('access_token', res.data.access_token)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  });

  useEffect(() => {
    const token = localStorage?.getItem('access_token')
    if (token) router.replace('/')
  })

  return (
    <div className='flex justify-center text-sm items-center w-screen h-[90vh] '>
      <div className='border p-10 flex items-center rounded-lg gap-5  flex-col'>
        <Image src='/Image/Logo.png' width={100} height={100} />
        <button
          className='border p-3 w-72 flex justify-center items-center gap-3 text-gray-500 hover:bg-gray-50 rounded-lg'
          onClick={() => login()}>
          <Image src='/login.png' width={27} height={27} />
          Sign In With Google
        </button>
      </div>
    </div>
  )
}
