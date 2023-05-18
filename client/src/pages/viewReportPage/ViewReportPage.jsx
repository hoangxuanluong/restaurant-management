import React, { useEffect, useMemo, useState } from 'react'
import './viewReportPage.css'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import Chart from '../../components/chart/Chart'
import axios from 'axios'
import { BarChart } from 'recharts'
import Barchar from '../../components/Barchar'

function ViewReportPage() {
  const [orderStats, setOrderStats] = useState([])
  const [foodStats, setFoodStats] = useState([])
  const [foodStatOpen, setFoodStatOpen] = useState(false)

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/api/orders/income')
        const result = res.data.map((item) => ({
          name: item.month + '/' + item.year,
          'total revenue': item.total,
        }))
        setOrderStats(result)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/api/orders/foodStat')
        const result = res.data.map((item) => ({
          name: item._id,
          'total quantity': item.totalQuantity,
        }))
        setFoodStats(result)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [])

  const handleChartSelect = (e) => {
    const value = e.target.value
    if (value === 'food') {
      setFoodStatOpen(true)
    } else {
      setFoodStatOpen(false)
    }
  }

  return (
    <>
      <ManagerNavbar />
      <div className='viewReportPage'>
        <ManagerSidebar />
        <div className='viewReportWrapper'>
          <div className='viewChart'>
            <div className='chartSelect'>
              <label className='selectChartLabel' for='chart-select'>
                Choose type of Stat:
              </label>
              <select
                className='charts'
                id='chart-select'
                onChange={handleChartSelect}
              >
                <option value='revenue'>Revenue</option>
                <option value='food'>Food</option>
              </select>
            </div>
            {foodStatOpen ? (
              <Barchar
                data={foodStats}
                title='Food Analytics'
                grid
                dataKey='total quantity'
              />
            ) : (
              <Chart
                data={orderStats}
                title='Revenue Analytics'
                grid
                dataKey='total revenue'
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewReportPage
