import React from 'react'
import SideBar from '../../component/SideBar'
import OrphanageCard from '../../component/OrphanageCard'

function HomePage() {
  return (
    <div className="flex h-screen">
        <SideBar />
        <div className="flex-grow flex-wrap p-4">
            <OrphanageCard />
        </div>
    </div>
  )
}

export default HomePage