import { useEffect } from 'react';
import LoginComponent from '../components/Login'

function Login() {
  useEffect(() => {
      document.title = "Login"
    }, []);
  return (
    <div className='py-8'>
        <LoginComponent />
    </div>
  )
}

export default Login