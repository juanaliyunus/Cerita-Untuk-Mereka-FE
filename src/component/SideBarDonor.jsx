import { Sidebar } from "flowbite-react"
import { BiBookAdd, BiLogOut } from "react-icons/bi"
import { CgAdd } from "react-icons/cg"
import { HiHome, HiUserCircle } from "react-icons/hi2"

const SideBar=()=>{
    return(
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
                    <nav>
                        <ul>
                            <li>
                                <a
                                    href="/donatur-dashboard"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 transition duration-300"
                                >
                                    <HiHome className="mr-3 text-xl" />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/donatur-profile"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 transition duration-300"
                                >
                                    <HiUserCircle className="mr-3 text-xl" />
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/donatur-checkDonation"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 transition duration-300"
                                >
                                    <BiBookAdd className="mr-3 text-xl" />
                                    Check Donation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="flex items-center py-2 px-4 mt-8 text-red-400 hover:bg-gray-700 transition duration-300"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        sessionStorage.removeItem('token');
                                    }}
                                >
                                    <BiLogOut className="mr-3 text-xl" />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main className="flex-1 p-6">
                {/* Content goes here */}
            </main>
        </div>

    )
}

export default SideBar