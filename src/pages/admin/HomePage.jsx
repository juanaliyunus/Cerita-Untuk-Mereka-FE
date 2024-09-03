import SideBarAdmin from "../../component/SideBarAdmin";

const HomePage = () => {
  return (
    <div className="flex">
    <SideBarAdmin />
    <div className="ml-4 w-3/4">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default HomePage;
