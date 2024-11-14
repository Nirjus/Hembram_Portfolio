import React from 'react'
import DashboardPage from './_components/PageOverview'
import { fetchAllUserData } from '../actions/action'

export default async function Dashboard(){
   const result = await fetchAllUserData()
  return (
    <DashboardPage data={result?.data} />
  )
}

