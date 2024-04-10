import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";

const Buscador = ({ filters, registros, onPageChange }) => {
  const [campo, setCampo] = useState("");
  const [filtro, setFiltro] = useState("");
  const handleCampoChange = (e) => {
    setCampo(e.target.value);
    setFiltro("");
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtro === "") {
      onPageChange(registros);
      return;
    }
    ejecFiltro();
  };

  const ejecFiltro = () => {
    if (!registros) {
      return;
    }
    const resultadosFiltrados = registros.filter((registro) => {
      if (registro[campo]) {
        const turnoBuscadoLower = filtro.toLowerCase();
        return registro[campo].toLowerCase().includes(turnoBuscadoLower);
      }
    });
    onPageChange(resultadosFiltrados);
  };
  useEffect(() => {
    ejecFiltro();
  }, [filtro]);

  useEffect(() => {
    if (filters[0].nombre) {
      setCampo(filters[0].nombre);
    }
  }, []);

  return (
    <div className="form-group  ">
      <form className="form-search">
        <div className="input-search">
          <label htmlFor="campo" className="campo-search">
            Filtros :
          </label>
          <select
            name="campo"
            value={campo}
            className="filter-search"
            onChange={handleCampoChange}
          >
            {/* <option value="student">Fíltro</option> */}
            {filters.map((item) => (
              <option key={item.id} value={item.nombre}>
                {item.descrip}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control text-search"
            name="filtro"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="button-search">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Buscador;
