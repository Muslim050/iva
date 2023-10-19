import React from "react";
import Header from "src/components/Site/Header/Header";
import Cards from "src/components/Site/Cards/Cards";
import Features from "src/components/Site/Features/Features";
import BuisnessModel from "src/components/Site/BuisnessModel/BuisnessModel";
import Footer from "src/components/Site/Footer/Footer";
import Slider from "src/components/Site/Slider/Slider";
import Banner from "src/components/Site/Banner/Banner";

function Site() {
  return (
    <div>
      <div className="wrapperSite">
        <Header />
        <Banner />
        <Cards />
        <Features />
        <BuisnessModel />
        <Slider />
        <Footer />
      </div>
    </div>
  );
}

export default Site;
