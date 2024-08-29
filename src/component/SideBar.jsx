import { Sidebar } from "flowbite-react"
import { BiBookAdd, BiLogOut } from "react-icons/bi"
import { CgAdd, CgProfile } from "react-icons/cg"
import { GiConfirmed } from "react-icons/gi"
import { GrSettingsOption } from "react-icons/gr"
import { HiChartPie } from "react-icons/hi2"

const SideBar=()=>{
    return(
        <div className="flex h-screen">
            <Sidebar aria-label="Sidebar with content" className="max-w-1/5">
                <Sidebar.Items>
                <h1 className="text-2xl font-bold text-center justify-center items-center">
                    Dashboard
                </h1>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/orphanage-dashboard" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="/orphanage-requestBook" icon={BiBookAdd}>
                            Request Buku
                        </Sidebar.Item>
                        <Sidebar.Item href="/orphanage-sugest" icon={CgAdd}>
                            Sugest Panti
                        </Sidebar.Item>
                        <Sidebar.Item href="/orphanage-confirmBook" icon={GiConfirmed}>
                            Konfirmasi Barang
                        </Sidebar.Item>
                        <Sidebar.Item href="/orphanage-profile" icon={CgProfile}>
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
            </Sidebar>
        </div>
    )
}

export default SideBar