import React from "react";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import OrphanageList from "../../component/OrphanageList";

function OrphanageListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 md:px-10 mt-10 flex flex-col ">
        <OrphanageList />
      </div>
      <Footer />
    </div>
  );
}

export default OrphanageListPage;
