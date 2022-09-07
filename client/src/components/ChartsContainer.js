import React, { useState } from 'react'
import BarChartComponent from './BarChart'
import AreaChartComponent from './AreaChart'
import { useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/ChartsContainer'
export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useSelector(
    (state) => state.statsModule
  )
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  )
}
