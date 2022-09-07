import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import { getJobs } from '../store/actions/jobActions'
import PageBtnContainer from './PageBtnContainer'
const JobsContainer = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.loadingModule)
  const {
    totalJobs,
    jobs,
    page,
    search,
    searchStatus,
    numOfPages,
    searchType,
    sort,
  } = useSelector((state) => state.jobModule)

  useEffect(() => {
    dispatch(getJobs({ search, searchStatus, searchType, sort, page }))
  }, [search, searchStatus, searchType, sort, page])
  if (isLoading) {
    return <Loading center />
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer
