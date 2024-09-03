import React from 'react'
import ListDonors from '../../component/ListDonors'
import OrphanageList from '../../component/OrphanageList'
import SideBarAdmin from '../../component/SideBarAdmin'

function ListUsers() {
  return (
    <>
    <div className="flex h-screen">
        <SideBarAdmin />
        <div className="flex-grow flex-wrap p-4">
        <ListDonors />
    </div>
    </div>
    </>
  )
}

export default ListUsers