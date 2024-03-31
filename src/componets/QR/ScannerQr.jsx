import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function ScannerQr() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // Estado para controlar si se está escaneando o no
 
  useEffect(() => {
    if (isScanning) {
      // Verificar si se debe iniciar el escaneo
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 350, height: 350 },
        disableFlip: true,
        rememberLastUsedCamera: false,
      });

      const handleSuccess = (result) => {
        console.log("Resultado:", result);
        scanner.clear();
        setScanResult(result);
        setIsScanning(false); // Detener el escaneo después de un resultado exitoso
      };

      const handleError = (err) => {
        console.warn(err);
      };

      scanner.render(handleSuccess, handleError);
    }
  }, [isScanning]); // Dependencia para el efecto, se ejecutará cuando isScanning cambie

  const handleNewScan = () => {
    setScanResult(null); // Limpiar el resultado anterior
    setIsScanning(true); // Habilitar el escaneo nuevamente
  };

  return (
    <div className="scannerqr">
      <h1>Verificación de Entradas</h1>
      {scanResult ? (
        <>
          <div>
            Éxito: <a href={scanResult}>{scanResult}</a>
          </div>
          <div>
            <button onClick={handleNewScan} className="btn btn-success mt-4">
              Nuevo Escaner
            </button>
          </div>
        </>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default ScannerQr;
