import {Container, Logo, LogoutBtn} from '../components'
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MobileNavBar({isSideBar}) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
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
                <NavLink
                  to={item.slug}
                  className={({isActive}) => `${isActive ? 'bg-blue-100 text-black ' : 'text-white '} inline-bock px-6 py-2 duration-200  hover:bg-blue-100 hover:text-black rounded-full text-center`}
                >
                {item.name}
              </NavLink>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
  )
}

export default MobileNavBar