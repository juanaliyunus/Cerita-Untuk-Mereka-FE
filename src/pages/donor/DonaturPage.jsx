import React from 'react'
import SideBarDonor from '../../component/SideBarDonor'
import Profile from '../../component/Profile'

function DonaturPage() {
  return (
    <div className="flex">
       <SideBarDonor />
      <div className="ml-4">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <Profile />
      </div>
    </div>
  )
}

export default DonaturPage