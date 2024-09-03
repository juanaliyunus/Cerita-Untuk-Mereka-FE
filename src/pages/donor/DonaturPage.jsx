import React from 'react'
import SideBarDonor from '../../component/SideBarDonor'
import Profile from '../../component/Profile'

function DonaturPage() {
  return (
      <div className="flex h-screen">
          <SideBarDonor className="w-64 bg-gray-800 text-white shadow-lg" />
          <div className="flex-1 p-6 bg-gray-100">
              <Profile />
          </div>
      </div>

  )
}

export default DonaturPage