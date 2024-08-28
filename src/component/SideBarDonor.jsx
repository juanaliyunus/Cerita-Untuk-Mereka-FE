import { Sidebar } from "flowbite-react"
import { BiBookAdd, BiLogOut } from "react-icons/bi"
import { CgAdd } from "react-icons/cg"
import { HiHome, HiUserCircle } from "react-icons/hi2"
import SwicthTheme from "./SwicthTheme"

const SideBar=()=>{
    return(
        <div className="flex h-screen">
            <Sidebar aria-label="Sidebar with content" className="max-w-1/5">
                <Sidebar.Items>
                <h1 className="text-2xl font-bold text-center justify-center items-center">
                    Dashboard
                </h1>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/donatur-dashboard" icon={HiHome}>
                            Home
                        </Sidebar.Item>
                        <Sidebar.Item href="/donatur-profile" icon={HiUserCircle}>
                            Profile
                        </Sidebar.Item>
                        <Sidebar.Item href="/donatur-checkDonation" icon={BiBookAdd}>
                            Check Donation
                        </Sidebar.Item>
                        <Sidebar.Item href="/donatur-editProfile" icon={CgAdd}>
                            Edit Profile
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
                <SwicthTheme />
            </Sidebar>
        </div>
    )
}

export default SideBar