import { useState, useEffect } from 'react'
import { Alert, FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'

import { useSelector, useDispatch } from 'react-redux'
import { displayAlert } from '../store/actions/alertActions'
import { setupUser } from '../store/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { showAlert } = useSelector((state) => state.alertModule)
  const { isLoading } = useSelector((state) => state.loadingModule)
  const { user } = useSelector((state) => state.userModule)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  }

  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        displayAlert({ type: 'danger', text: 'please provide all values' })
      )
      return
    }
    const currentUser = { name, email, password }

    dispatch(
      setupUser({ currentUser, endPoint: isMember ? 'login' : 'register' })
    )
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name field */}
        {!values.isMember && (
          <FormRow
            value={values.name}
            name='name'
            type='name'
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          value={values.email}
          name='email'
          type='email'
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          value={values.password}
          name='password'
          type='password'
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
