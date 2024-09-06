import React from 'react'
import SideBarDonor from '../../component/SideBarDonor'
import Profile from '../../component/Profile'

function DonaturPage() {
  return (
      <div className="flex h-screen">
          <SideBarDonor className="w-64 text-white shadow-lg" />
            <div className="flex-1 p-6 bg-[#E0F7FA]">
                <Profile />
            </div>
      </div>

  )
}

export default DonaturPage