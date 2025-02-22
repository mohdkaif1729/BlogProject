import {Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
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
    <header className='py-2 tablet:py-3 shadow bg-slate-800'>
      <Container>
        <nav className='flex tablet:flex-row tablet:justify-between'>
          <div>
            <Link to='/'>
              <Logo/>
              </Link>
          </div>
          <ul className='flex gap-x-2 max-tablet:w-full max-tablet:justify-between items-center'>
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
            {authStatus && (
              <li className='hidden tablet:block'>
                <LogoutBtn />
              </li>
            )}
            
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header