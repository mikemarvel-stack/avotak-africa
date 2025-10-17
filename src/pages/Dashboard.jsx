import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import StatsCard from '../components/StatsCard'

export default function Dashboard(){
  const [data, setData] = useState([])
  useEffect(()=> {
    setData([
      {month:'Jan', orders:12},
      {month:'Feb', orders:18},
      {month:'Mar', orders:25},
      {month:'Apr', orders:9},
      {month:'May', orders:30}
    ])
  },[])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Orders (last 6 months)</h3>
          <div style={{width:'100%', height:300}}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#2f855a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatsCard title="Total Clients" value="42" />
            <StatsCard title="Active Projects" value="8" />
            <StatsCard title="Avg. Delivery" value="3 days" />
            <StatsCard title="Satisfaction" value="96%" />
          </div>
        </div>
      </div>
    </section>
  )
}
