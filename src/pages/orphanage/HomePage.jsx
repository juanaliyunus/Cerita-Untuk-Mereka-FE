import React from 'react'
import SideBar from '../../component/SideBar'
import OrphanageList from '../../component/OrphanageList'

function HomePage() {
  return (
    <div className="flex h-screen">
        <SideBar />
        <div className="flex-grow flex-wrap p-4">
            <OrphanageList />
        </div>
    </div>
  )
}

export default HomePage