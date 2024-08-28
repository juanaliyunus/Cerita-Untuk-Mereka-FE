import SideBarDonor from '../../component/SideBarDonor'

const DonatePage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBarDonor />
      </div>
      <div className="ml-4 w-3/4">
        <h1>Donate</h1>
      </div>
    </div>
  )
}

export default DonatePage