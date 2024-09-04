import React from "react";
import SideBarDonor from "../../component/SideBarDonor";
import DonorDonationHistory from "../../component/DonorDonationHistory";

function CheckDonation() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBarDonor className="w-1/4 p-4" />
      
      {/* Main content */}
      <main className="flex-1 p-8">
        <DonorDonationHistory />
      </main>
    </div>
  );
}

export default CheckDonation;
