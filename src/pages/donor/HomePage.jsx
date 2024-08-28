import React from "react";
import Navbar from "../../component/Navbar";
import OrphanageList from "../../component/OrphanageList";
import BookList from "../../component/BookList";
import Footer from "../../component/Footer";

function HomePage() {
  return (
    <>
      <Navbar />  
     <div className="container mx-32 flex justify-center  mt-10 flex-col">
        <OrphanageList />
        <BookList />
     </div>
        <Footer />
    </>
  );
}

export default HomePage;
