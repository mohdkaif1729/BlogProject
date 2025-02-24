import {Container, Logo, LogoutBtn} from '../components'
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { setSideBar } from "../store/sideBarSlice"
import { useDispatch } from "react-redux";

function MobileNavBar() {
  const authStatus = useSelector((state) => state.auth.status);
  const isSideBar = useSelector((state) => state.sideBar.isSideBar);
  const dispatch = useDispatch();
  
  const handleSideBar = () => {
    dispatch(setSideBar());
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
      <Container>
        <nav className={`flex flex-col absolute bg-slate-800 w-[80%] h-screen top-0 left-0 z-10 tablet:hidden gap-y-20 p-4 transition duration-200 ${isSideBar ? '-translate-x-0' : '-translate-x-full' }`}>
          <div className='flex justify-center'>
            <Link to='/'>
              <Logo/>
              </Link>
          </div>
          <ul className='flex flex-col gap-y-10'>
            {navItems.map((item) => 
            item.active ? (
              
              <li key={item.name}>
                <button onClick={handleSideBar}>
                <NavLink
                  to={item.slug}
                  className={({isActive}) => `${isActive ? 'bg-blue-100 text-black ' : 'text-white '} inline-bock px-6 py-2 duration-200  hover:bg-blue-100 hover:text-black rounded-full text-center`}
                >
                {item.name}
              </NavLink>
                </button>
              </li>
            ) : null
            )}
          </ul>
        </nav>
        </Container>
  )
}

export default MobileNavBar