import React from 'react'

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-green-50 p-4 rounded-lg text-center">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-semibold text-primary">{value}</div>
    </div>
  )
}
