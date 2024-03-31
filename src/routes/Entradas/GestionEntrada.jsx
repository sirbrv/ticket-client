import { useState, useEffect, useRef } from "react";
import ValidateErrors from "../../componets/services/ValidateErrors";
import validationSchema from "../../componets/services/validationSchema";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { useAppContext } from "../../hooks/appContext";

import Swal from "sweetalert2";
 
export default function GeneraEntrada({ entrada, edit, riviewList }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/ticket`;
  const { HandleNivelClose } = useAppContext();
  const [academys, setAcademys] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(false);

  const tipoEntradas = [
    { id: 1, descrip: "General" },
    { id: 2, descrip: "1era. Clase" },
    { id: 3, descrip: "2da. Clase" },
  ];

  const tipoEstatus = [
    { id: 1, descrip: "Generada" },
    { id: 2, descrip: "Asignada" },
    { id: 3, descrip: "Pendiente de Pago" },
    { id: 4, descrip: "Tickets Pagado" },
  ];

  const initialForm = {
    id: entrada ? entrada.id : "",
    codigoEntrada: entrada ? entrada.codigoEntrada : "",
    academia: entrada ? entrada.academia : "",
    evento: entrada ? entrada.evento : "",
    tipoEntrada: entrada ? entrada.tipoEntrada : "",
    costo: entrada ? entrada.costo : "",
    estatus: entrada ? entrada.estatus : "",
    responsable: entrada ? entrada.responsable : "",
    urlAcademia: entrada ? entrada.urlAcademia : "",
  };

  const { formData, onInputChange, validateForm, errorsInput, clearForm } =
    useForm(initialForm, validationSchema);

  let {
    id,
    codigoEntrada,
    academia,
    evento,
    tipoEntrada,
    costo,
    estatus,
    responsable,
    urlAcademia,
  } = formData;

  let {
    data,
    isLoading = false,
    // getData,
    createData,
    updateData,
  } = useFetch(null);

  let { getData } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      if (!edit) {
        await createData(api, formData);
      } else {
        await updateData(api, entrada.id, formData);
      }
    } else {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Debes corregir la información para poder registrarla",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const getInitData = async () => {
    let url = `${hostServer}/api/academys`;
    let result = await getData(url);
    if (result) {
      setAcademys(result.data.data);
    }
    url = `${hostServer}/api/events`;
    result = await getData(url);
    if (result) {
      setEventos(result.data.data);
    }
  };

  useEffect(() => {
    if (data?.message) {
      data?.message &&
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 3500,
        });
    } else {
      if (data?.status === 200 || data?.status === 201) {
        data?.data.message &&
          Swal.fire({
            position: "top",
            icon: "success",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 3500,
          });
      } else {
        data?.data.message &&
          Swal.fire({
            position: "top",
            icon: "warning",
            title: data?.data?.message,
            showConfirmButton: false,
            timer: 3500,
          });
      }
      if (data?.status === 200) {
        HandleNivelClose();
        riviewList();
      }
      if (data?.status === 201) {
        clearForm();
        riviewList();
      }
    }
  }, [data]);

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <>
      {
        // isLoading ? (
        // <h3>Cargando...</h3>
        // ) :
        error ? (
          errorMessage()
        ) : (
          <div className="container my-5 px-5">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="text">Entrada</label>
                  <input
                    type="text"
                    className="form-control"
                    name="codigoEntrada"
                    value={codigoEntrada}
                    onChange={onInputChange}
                    disabled
                  />
                  {errorsInput.responsable && (
                    <ValidateErrors errors={errorsInput.responsable} />
                  )}
                </div>
                <div className="form-group col-md-8">
                  <label htmlFor="academia">Académia</label>
                  <select
                    className="form-control"
                    name="academia"
                    value={academia}
                    onChange={onInputChange}
                    disabled
                  >
                    <option>Seleccione la Academia...</option>
                    {/*Listado de academys*/}
                    {academys.map((academy) => {
                      return (
                        <option key={academy.id} value={academy.nombre}>
                          {academy.nombre}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <label htmlFor="evento">Evento</label>
                  <input
                    type="text"
                    className="form-control"
                    name="evento"
                    value={evento}
                    onChange={onInputChange}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="urlAcademia">URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="urlAcademia"
                    value={urlAcademia}
                    onChange={onInputChange}
                    disabled
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="estatus">Estátus de la Entrada</label>
                  <select
                    className="form-control"
                    name="estatus"
                    value={estatus}
                    onChange={onInputChange}
                  >
                    <option>Seleccione el tipo de entrada...</option>
                    {tipoEstatus.map((item) => {
                      return (
                        <option key={item.id} value={item.descrip}>
                          {item.descrip}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="text">Responsable de Venta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="responsable"
                    // placeholder="Ingrese el ultimo número de la secuencia..."
                    value={responsable}
                    onChange={onInputChange}
                  />
                  {errorsInput.responsable && (
                    <ValidateErrors errors={errorsInput.responsable} />
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="tipoEntrada">Tipo de Entrada</label>
                  <select
                    className="form-control"
                    name="tipoEntrada"
                    value={tipoEntrada}
                    onChange={onInputChange}
                    disabled
                  >
                    <option>Seleccione el tipo de entrada...</option>
                    {tipoEntradas.map((item) => {
                      return (
                        <option key={item.id} value={item.descrip}>
                          {item.descrip}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="costo">Costo </label>
                  <input
                    type="text"
                    className="form-control"
                    name="costo"
                    value={costo}
                    onChange={onInputChange}
                    disabled
                  />
                  {errorsInput.costo && (
                    <ValidateErrors errors={errorsInput.costo} />
                  )}{" "}
                </div>
              </div>
              <div className="btn-submit mt-5">
                {edit ? (
                  <button type="submit" className="btn btn-primary w-100">
                    Actualizar
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success w-100">
                    Generar Entrada
                  </button>
                )}
              </div>
            </form>
          </div>
        )
      }
    </>
  );
}
