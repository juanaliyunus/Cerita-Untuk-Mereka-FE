import React from "react";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import OrphanageList from "../../component/OrphanageList";

function OrphanageListPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
      <Navbar style={{ zIndex: 1000, position: 'relative' }} />
      <div style={{ flex: 1 }} className="container mx-32 flex  mt-10 flex-col"> 
        <OrphanageList />
      </div>
      <Footer />
    </div>
  );
}

export default OrphanageListPage;
