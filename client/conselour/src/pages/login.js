import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';

export default function Login() {
  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      try {
        const res = await axios.post('https://api.livy.chat/',
          {
            token: codeResponse.access_token,
            role: 'conselour'
          }
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  });
  return (
    <div className='flex justify-center items-center w-screen h-[90vh] '>
      <div className='border p-10 flex items-center rounded-lg gap-5  flex-col'>
        <Image src='/Image/Logo.png' width={100} height={100} />
        <button
          className='border p-4 w-72 flex justify-center gap-3 text-gray-500 hover:bg-gray-50 rounded-lg'
          onClick={() => login()}>
          <Image src='/login.png' width={27} height={27} />
          Sign In With Google
        </button>
      </div>
    </div>
  )
}
