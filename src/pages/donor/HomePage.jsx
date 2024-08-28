import React from "react";
import Navbar from "../../component/Navbar";
import OrphanageList from "../../component/OrphanageList";
import BookList from "../../component/BookList";
import Footer from "../../component/Footer";

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
      <Navbar />
      <div style={{ flex: 1 }} className="container mx-32 flex  mt-10 flex-col"> 
        <OrphanageList />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
