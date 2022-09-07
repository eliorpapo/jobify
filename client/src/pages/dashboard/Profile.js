import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { displayAlert } from '../../store/actions/alertActions'
import { updateUser } from '../../store/actions/userActions'

const Profile = () => {
  const { showAlert } = useSelector((state) => state.alertModule)
  const { isLoading } = useSelector((state) => state.loadingModule)
  const { user } = useSelector((state) => state.userModule)
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      // test and remove temporary
      dispatch(
        displayAlert({ type: 'danger', text: 'please provide all values' })
      )
      return
    }
    dispatch(updateUser({ name, email, lastName, location }))
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}
        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile
