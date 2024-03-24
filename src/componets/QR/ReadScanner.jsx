import React from "react";
import ScannerQr from "./ScannerQr";
import Footer from "../../routes/footer/Footer";

import "./scanner.css";
function ReadScanner() {
  return (
    <>
      <div className="scanerqr">
        {/* <h1 className="tickets"> LIPSTICK DANCE CREW</h1> */}
        <ScannerQr />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default ReadScanner;
