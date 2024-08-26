import { Sidebar } from "flowbite-react"
import { BsPerson } from "react-icons/bs"
import { HiChartPie } from "react-icons/hi2"

const SideBar=()=>{
    return(
        <div>
            <Sidebar aria-label="Sidebar with content">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BsPerson}>
                            Team
                        </Sidebar.Item>
                        
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar