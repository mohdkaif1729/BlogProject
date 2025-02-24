import {Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSideBar } from '../../store/sideBarSlice'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
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
    <header className='py-2 tablet:py-3 shadow bg-slate-800'>
      <Container>
        <nav className='flex tablet:flex-row tablet:justify-between'>
          <div>
            <Link to='/'>
              <Logo/>
              </Link>
          </div>
          <ul className='flex gap-x-2 max-tablet:w-full max-tablet:justify-around items-center'>
            {navItems.map((item) => 
            item.active ? (
              
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({isActive}) => `${isActive ? 'bg-blue-100 text-black ' : 'text-white '} inline-bock px-6 py-2 duration-200  hover:bg-blue-100 hover:text-black rounded-full hidden tablet:block text-center`}
                >
                {item.name}
              </NavLink>
              </li>
            ) : null
            )}
            {!authStatus && <li key={'login'} className='pr-4 mobile:pr-3 tablet:hidden'>
                <NavLink
                  to='/login'
                  className={({isActive}) => `${isActive ? 'bg-blue-100 text-black ' : 'text-white '} inline-bock px-6 py-2 duration-200  hover:bg-blue-100 hover:text-black rounded-full text-center`}
                >
                  Login
                </NavLink>
              </li>
            }
            {authStatus && (
              <li className='pr-4 mobile:pr-3'>
                <LogoutBtn />
              </li>
            )}
            <button onClick={handleSideBar} className='tablet:hidden block text-2xl text-white absolute top-3 right-3'>
								&#9776;
						</button>
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header