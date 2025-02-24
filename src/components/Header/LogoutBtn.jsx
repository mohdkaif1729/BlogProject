import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import  Swal  from "sweetalert2";


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
        Swal.fire({
          title: "Logout Successfully",
          icon: "success",
          draggable: true
        });
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 text-white hover:bg-blue-100 hover:text-black rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn