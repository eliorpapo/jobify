import { NavLinks, Logo } from './index'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useSelector } from 'react-redux'

const BigSidebar = () => {
  const { showSidebar } = useSelector((state) => state.sidebarModule)
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container '
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar
