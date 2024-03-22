import React from "react";
import ScannerQr from "./ScannerQr";
import "./scanner.css";
function ReadScanner() {
  return (
    <>
      <div className="scanerqr">
        {/* <h1 className="tickets"> LIPSTICK DANCE CREW</h1> */}
        <ScannerQr />
      </div>
    </>
  );
}

export default ReadScanner;
