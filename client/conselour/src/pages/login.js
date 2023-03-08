import Spinner from '@/components/Spinner';
import { api } from '@/helpers';
import { useCounselor } from '@/hooks/useCounselor';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter()
  const { counselor, setCounselor } = useCounselor()

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      try {
        const res = await api.post('/login',
          {
            token: codeResponse.access_token,
            role: 'counselor'
          }
        )

        localStorage.setItem('access_token', res.data.access_token)

        const submission = await api.get('/counselor/status')
        setCounselor(res.data.user)

        toast.success('Login Successfully');

        if (submission.data.status === 'pending') return router.push('/pending')
        router.push('/')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Internal Server Error');
      }
    }
  });

  useEffect(() => {
    const token = localStorage?.getItem('access_token')
    if (token){
      console.log('a')
      router.push('/')
    } 
  }, [])

  if (counselor) return null

  return (
    <div className='flex justify-center text-sm items-center w-screen h-[90vh] '>
      <div className='border p-10 flex items-center rounded-lg gap-5  flex-col'>
        <img alt="logo" src='/Image/Logo.png' width={100} height={100} />
        <button
          className='border p-3 w-72 flex justify-center items-center gap-3 text-gray-500 hover:bg-gray-50 rounded-lg'
          onClick={() => login()}>
          <img src='/login.png' alt='logo-google' width={27} height={27} />
          Sign In With Google
        </button>
      </div>
    </div>
  )
}
