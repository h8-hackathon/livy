import Protected from '@/layouts/Protected';
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'jotai'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const clientId = '338857378147-i9iovlptidjlqpfc0pn3cfdg2dnpf6uo.apps.googleusercontent.com'
  return (
    <Provider>
      <Protected >
        <GoogleOAuthProvider clientId={clientId} >
          <ToastContainer position="top-right" autoClose={2000} closeOnClick draggable pauseOnHover />
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Protected>
    </Provider>
  )
}
