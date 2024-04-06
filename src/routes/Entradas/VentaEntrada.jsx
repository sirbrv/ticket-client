import { useState, useEffect, useRef } from "react";
import ValidateErrors from "../../componets/services/ValidateErrors";
import validationSchema from "../../componets/services/validationVentaSchema";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import AccessProfil from "../../componets/services/AccessProfil";

export default function VentaEntrada({ entrada, edit, riviewList }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/v2/ticket`;
  const [error, setError] = useState(false);
  const [eventos, setEventos] = useState([]);
  const inputRef = useRef(null);

  AccessProfil("isSaler");
  const formaPagos = [
    { id: 1, descrip: "Total" },
    { id: 2, descrip: "Parcial" },
  ];

  const metodoPagos = [
    { id: 1, descrip: "Efectivo" },
    { id: 2, descrip: "Transferencia" },
    { id: 3, descrip: "Deposito" },
    { id: 4, descrip: "Débito" },
    { id: 5, descrip: "Crédito" },
  ];

  const initialForm = {
    id: entrada ? entrada.id : "",
    codigoEntrada: entrada ? entrada.codigoEntrada : "",
    academia: entrada ? entrada.academia : "",
    evento: entrada ? entrada.evento : "",
    emailComprador: entrada ? entrada.emailComprador : "",
    nombreComprador: entrada ? entrada.nombreComprador : "",
    costo: entrada ? entrada.costo : 0,
    formaPago: entrada ? entrada.formaPago : "",
    montoPago: entrada ? entrada.montoPago : "",
    metodoPago: entrada ? entrada.metodoPago : "",
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
    costo,
    emailComprador,
    nombreComprador,
    metodoPago,
    formaPago,
    montoPago,
    responsable,
    urlAcademia,
  } = formData;

  let {
    data,
    isLoading = false,
    // getData,
    createData,
    updateData,
    envioCorreo,
  } = useFetch(null);

  let { getData } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      if (!edit) {
        /*  se crea el registro */
        const result = await createData(api, formData);
        /* Sección de evio de correo - se condiciona que la creación terminó bien antes de enviar */
        if (result.status === 201) {
          const api = `${hostServer}/api/v2/envioticket`;
          envioCorreo(api, formData);
        }
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
    let url = `${hostServer}/api/v2/events`;
    let result = await getData(url);
    if (result) {
      setEventos(result.data.data);
    }
  };

  const handleBlur = async () => {
    let api = `${hostServer}/api/v2/ticketCodigo`;
    let url = `${api}/${codigoEntrada}`;
    let result = await getData(url);
    if (result?.status === 200) {
      const { evento, costo, responsable, estatus, urlAcademia } =
        result.data.data;
      let simulatedEvent = {};

      if (estatus !== "Asignada") {
        {
          Swal.fire({
            position: "top",
            icon: "info",
            title: "La Entrada no a sído asignada, venta no autoriáda.",
            showConfirmButton: false,
            timer: 4000,
          });
        }
        clearForm();
        inputRef.current.focus();
      } else {
        formData.evento = evento;
        formData.costo = costo;
        formData.responsable = responsable;
        formData.urlAcademia = urlAcademia;
        simulatedEvent = {
          target: { name: "evento", value: evento },
        };
        onInputChange(simulatedEvent);
      }
    } else {
      result?.data.message &&
        Swal.fire({
          position: "top",
          icon: "warning",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 3500,
        });
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
        clearForm();
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
          <>
            <div className="container my-3 px-3">
              <h1 className="my-3">Venta de Entradas</h1>
              <form onSubmit={handleSubmit}>
                <div className="row mt-4">
                  <div className="form-group col-md-3">
                    <label htmlFor="text">Número de Entrada</label>
                    <input
                      type="text"
                      ref={inputRef}
                      className="form-control"
                      name="codigoEntrada"
                      value={codigoEntrada}
                      onChange={onInputChange}
                      onBlur={handleBlur}
                      disabled={edit ? true : false}
                    />
                    {errorsInput.codigoEntrada && (
                      <ValidateErrors errors={errorsInput.codigoEntrada} />
                    )}
                  </div>
                  <div className="form-group col-md-6">
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
                  <div className="form-group col-md-3">
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

                <div className="row mt-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="text">Responsable de Venta</label>
                    <input
                      type="text"
                      className="form-control"
                      name="responsable"
                      value={responsable}
                      onChange={onInputChange}
                      disabled
                    />
                    {errorsInput.responsable && (
                      <ValidateErrors errors={errorsInput.responsable} />
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="urlAcademia">URL de envío de Correos</label>
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
                    <label htmlFor="nombreComprador">
                      Nombre del Comprador{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreComprador"
                      placeholder="Ingrese Nombre Completo..."
                      value={nombreComprador}
                      onChange={onInputChange}
                    />
                    {errorsInput.nombreComprador && (
                      <ValidateErrors errors={errorsInput.nombreComprador} />
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="emailComprador">
                      Correo Electrónico del Comprador
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="emailComprador"
                      placeholder="Ingrese el Correo Electónico.."
                      value={emailComprador}
                      onChange={onInputChange}
                    />
                    {errorsInput.emailComprador && (
                      <ValidateErrors errors={errorsInput.emailComprador} />
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="form-group col-md-4">
                    <label htmlFor="metodoPago">Método de Pago</label>
                    <select
                      className="form-control"
                      name="metodoPago"
                      value={metodoPago}
                      onChange={onInputChange}
                    >
                      <option>Seleccione el método de Pago...</option>
                      {metodoPagos.map((metodo) => {
                        return (
                          <option key={metodo.id} value={metodo.descrip}>
                            {metodo.descrip}
                          </option>
                        );
                      })}
                    </select>{" "}
                    {errorsInput.metodoPago && (
                      <ValidateErrors errors={errorsInput.metodoPago} />
                    )}
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="montoPago">Monto Pagado</label>
                    <input
                      type="text"
                      className="form-control"
                      name="montoPago"
                      placeholder="Ingrese Nombre Completo..."
                      value={montoPago}
                      onChange={onInputChange}
                    />
                    {errorsInput.montoPago && (
                      <ValidateErrors errors={errorsInput.montoPago} />
                    )}
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="formaPago">Tipo de Pago</label>
                    <select
                      className="form-control"
                      name="formaPago"
                      value={formaPago}
                      onChange={onInputChange}
                    >
                      <option>Seleccione el Tipo de Pago...</option>
                      {formaPagos.map((tipo) => {
                        return (
                          <option key={tipo.id} value={tipo.descrip}>
                            {tipo.descrip}
                          </option>
                        );
                      })}
                    </select>
                    {errorsInput.formaPago && (
                      <ValidateErrors errors={errorsInput.formaPago} />
                    )}
                  </div>
                </div>
                <div className="btn-submit mt-5">
                  {edit ? (
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary w-100"
                    >
                      Actualizar
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-success w-100"
                    >
                      Agregar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        )
      }
    </>
  );
}
