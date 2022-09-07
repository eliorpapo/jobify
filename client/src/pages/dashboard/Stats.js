import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatsContainer, Loading, ChartsContainer } from '../../components'
import { showStats } from '../../store/actions/statsActions'
const Stats = () => {
  const { isLoading } = useSelector((state) => state.loadingModule)
  const { monthlyApplications } = useSelector((state) => state.statsModule)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showStats())
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}
export default Stats
