import { Sidebar } from "flowbite-react"
import { BiLogOut } from "react-icons/bi"
import { CgAdd } from "react-icons/cg"
import { GiConfirmed, GiThreeFriends } from "react-icons/gi"
import { HiChartPie } from "react-icons/hi2"

const SideBarAdmin=()=>{
    return(
        <div className="flex h-screen">
            <Sidebar aria-label="Sidebar with content" className="max-w-1/5">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin-dashboard" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin-ListUsers" icon={GiThreeFriends}>
                            Donor List
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin-ListOrphanage" icon={GiThreeFriends}>
                            Orphanage List
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin-confirmBook" icon={GiConfirmed}>
                            Book Confirmation
                        </Sidebar.Item>

                        <Sidebar.Item 
                            href="/" 
                            icon={BiLogOut}
                            onClick={() => {
                                localStorage.removeItem('token');
                                sessionStorage.removeItem('token');
                            }}
                        >
                            Logout
                        </Sidebar.Item>
                        
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBarAdmin