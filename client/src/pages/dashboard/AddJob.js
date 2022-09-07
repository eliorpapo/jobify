import { FormRow, Alert, FormRowSelect } from '../../components'
import { displayAlert } from '../../store/actions/alertActions'
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from '../../store/actions/jobActions'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useSelector, useDispatch } from 'react-redux'

const AddJob = () => {
  const dispatch = useDispatch()
  const { showAlert } = useSelector((state) => state.alertModule)
  const { isLoading } = useSelector((state) => state.loadingModule)
  const {
    isEditing,
    editJobId,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useSelector((state) => state.jobModule)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      dispatch(
        displayAlert({ type: 'danger', text: 'please provide all values' })
      )
      return
    }
    if (isEditing) {
      dispatch(
        editJob({ position, company, jobLocation, jobType, status, editJobId })
      )
      return
    }

    dispatch(createJob(position, company, jobLocation, jobType, status))
  }
  const handleJobInput = ({ target }) => {
    const { name, value } = target
    dispatch(handleChange({ name: name, value: value }))
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}
        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            labelText='type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                dispatch(clearValues())
              }}
              disabled={isLoading}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob
