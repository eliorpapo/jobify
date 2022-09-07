import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../store/actions/sidebarActions'
import NavLinks from './NavLinks'

export const SmallSidebar = () => {
  const { showSidebar } = useSelector((state) => state.sidebarModule)
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <button
            className='close-btn'
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar
