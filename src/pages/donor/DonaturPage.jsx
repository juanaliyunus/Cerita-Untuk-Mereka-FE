import React from 'react'
import SideBarDonor from '../../component/SideBarDonor'
import Profile from '../../component/Profile'

function DonaturPage() {
  return (
    <div className="flex">
       <SideBarDonor />
      <div className="ml-4">
        <Profile />
      </div>
    </div>
  )
}

export default DonaturPage