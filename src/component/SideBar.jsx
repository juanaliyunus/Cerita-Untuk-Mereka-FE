import { Sidebar } from "flowbite-react"
import { BiBookAdd, BiLogOut } from "react-icons/bi"
import { CgAdd } from "react-icons/cg"
import { GiConfirmed } from "react-icons/gi"
import { GrSettingsOption } from "react-icons/gr"
import { HiChartPie } from "react-icons/hi2"


const SideBar=()=>{
    return(
        <div>
            <Sidebar aria-label="Sidebar with content" className="h-screen w-1/5 justify-start items-start">
                <Sidebar.Items>
                <h1 className="text-2xl font-bold text-center justify-center items-center">
                    Dashboard
                </h1>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BiBookAdd}>
                            Request Buku
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={CgAdd}>
                            Sugest Panti
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={GiConfirmed}>
                            Konfirmasi Barang
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={GrSettingsOption}>
                            Pengaturan
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BiLogOut}>
                            Logout
                        </Sidebar.Item>
                        
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar