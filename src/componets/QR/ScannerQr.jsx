// import React, { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// function ScannerQr() {
//   const [scanResult, setScanResult] = useState(null);
//   const [isScanning, setIsScanning] = useState(true); // Estado para controlar si se está escaneando o no

//   useEffect(() => {
//     if (isScanning) {
//       // Verificar si se debe iniciar el escaneo
//       const scanner = new Html5QrcodeScanner("reader", {
//         fps: 10,
//         qrbox: { width: 350, height: 350 },
//         disableFlip: true,
//         rememberLastUsedCamera: false,
//       });

//       const handleSuccess = (result) => {
//         console.log("Resultado:", result);
//         scanner.clear();
//         setScanResult(result);
//         setIsScanning(false); // Detener el escaneo después de un resultado exitoso
//       };

//       const handleError = (err) => {
//         console.warn(err);
//       };

//       scanner.render(handleSuccess, handleError);
//     }
//   }, [isScanning]); // Dependencia para el efecto, se ejecutará cuando isScanning cambie

//   const handleNewScan = () => {
//     setScanResult(null); // Limpiar el resultado anterior
//     setIsScanning(true); // Habilitar el escaneo nuevamente
//   };

//   return (
//     <div className="scannerqr">
//       <h1>Verificación de Entradas</h1>
//       {scanResult ? (
//         <>
//           <div>
//             Éxito: <a href={scanResult}>{scanResult}</a>
//           </div>
//           <div>
//             <button onClick={handleNewScan} className="btn btn-success mt-4">
//               Nuevo Escaner
//             </button>
//           </div>
//         </>
//       ) : (
//         <div id="reader"></div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import ErrorMessage from "../services/ErrorMessahe"; // Importa un componente para mostrar mensajes de error

function ScannerQr() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState(null);

  // Función para iniciar el escaneo
  const startScanning = useCallback(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 350, height: 350 },
      disableFlip: true,
      rememberLastUsedCamera: false,
    });

    const handleSuccess = (result) => {
      scanner.clear();
      setScanResult(result);
      setIsScanning(false);
    };

    const handleError = (err) => {
      console.error("Error while scanning:", err);
      setError(err); // Guarda el error para mostrarlo al usuario
      setIsScanning(false);
    };

    scanner.render(handleSuccess, handleError);

    // Limpia el scanner cuando se desmonta el componente o cuando se inicia un nuevo escaneo
    return () => {
      scanner.clear();
    };
  }, []);

  // Función para iniciar un nuevo escaneo
  const handleNewScan = () => {
    setScanResult(null);
    setIsScanning(true);
    setError(null); // Limpia cualquier error anterior
  };

  useEffect(() => {
    if (isScanning) {
      startScanning();
    }
  }, [isScanning, startScanning]);

  return (
    <div className="scannerqr">
      <h1>Verificación de Entradas</h1>
      {error ? ( // Muestra un mensaje de error si hay un error
        <ErrorMessage
          message={error.message}
          onDismiss={() => setError(null)}
        />
      ) : scanResult ? ( // Muestra el resultado del escaneo si está disponible
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
