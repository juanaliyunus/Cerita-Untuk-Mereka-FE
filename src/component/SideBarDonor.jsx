import { BiBookAdd, BiLogOut } from "react-icons/bi";
import { HiHome, HiUserCircle } from "react-icons/hi2";

const SideBarDonor = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-[#4e7a94] to-[#2f4b60] text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
            Dashboard
          </h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="/donatur-dashboard"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-[#3b546a] transition duration-300"
                >
                  <HiHome className="mr-3 text-2xl" />
                  <span className="text-lg font-medium">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/donatur-profile"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-[#3b546a] transition duration-300"
                >
                  <HiUserCircle className="mr-3 text-2xl" />
                  <span className="text-lg font-medium">Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="/donatur-checkDonation"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-[#3b546a] transition duration-300"
                >
                  <BiBookAdd className="mr-3 text-2xl" />
                  <span className="text-lg font-medium">Check Donation</span>
                </a>
              </li>
              <li className="mt-8">
                <a
                  href="/"
                  className="flex items-center py-3 px-4 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition duration-300"
                  onClick={() => {
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                  }}
                >
                  <BiLogOut className="mr-3 text-2xl" />
                  <span className="text-lg font-medium">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideBarDonor;
