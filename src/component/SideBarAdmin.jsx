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
                <h1 className="text-2xl font-bold text-center justify-center items-center">
                    Dashboard
                </h1>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin-dashboard" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin-ListUsers" icon={GiThreeFriends}>
                            List Donatur
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin-ListOrphanage" icon={GiThreeFriends}>
                            List Panti
                        </Sidebar.Item>
                        {/* <Sidebar.Item href="/admin-AddOrphanage" icon={CgAdd}>
                            Tambah Panti
                        </Sidebar.Item> */}
                        <Sidebar.Item href="/admin-confirmBook" icon={GiConfirmed}>
                            Konfirmasi Buku
                        </Sidebar.Item>
                        {/* <Sidebar.Item href="/admin-VerificationOrphanage" icon={GiConfirmed}>
                            Verifikasi Panti
                        </Sidebar.Item> */}
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