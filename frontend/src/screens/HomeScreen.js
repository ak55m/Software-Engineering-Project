import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";

// Other imports...

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);

  // Ensure match is defined before accessing its properties
  const keyword = match?.params?.keyword;


  return (
    <div>
      <Header />
      {/* Pass latitude and longitude as props */}
      <ShopSection keyword={keyword} />
      <CalltoActionSection />
      <Footer />
    </div>
  );
};

export default HomeScreen;

