import { useState, useEffect, useRef } from "react";
import ValidateErrors from "../../componets/services/ValidateErrors";
import validationSchema from "../../componets/services/validationSchema";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { useAppContext } from "../../hooks/appContext";

import Swal from "sweetalert2";
// import "./student.css";

export default function Student({ student, edit, riviewList }) {
  const { HandleNivelClose } = useAppContext();
  const api = "http://localhost:5000/api/student";
  const [error, setError] = useState(false);
  const [academys, setAcademys] = useState([]);
  const initialForm = {
    id: student ? student.id : "",
    dni: student ? student.dni : "",
    nombre: student ? student.nombre : "",
    email: student ? student.email : "",
    celular: student ? student.celular : "",
    adress: student ? student.adress : "",
    academia: student ? student.academia : "",
  };

  const { formData, onInputChange, validateForm, errorsInput, clearForm } =
    useForm(initialForm, validationSchema);

  const { id, dni, nombre, email, adress, celular, academia } = formData;

  let {
    data,
    isLoading = false,
    // getData,
    createData,
    updateData,
  } = useFetch(null);

  let { dataAcademy, getData } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      let url = `${api}`;
      if (!edit) {
        await createData(url, formData);
      } else {
        await updateData(url, student.id, formData);
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

  const getAcademys = async () => {
    const api = "http://localhost:5000/api/academys";
    const result = await getData(api);
    if (result) {
      setAcademys(result.data.data);
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
    getAcademys();
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
                  <label htmlFor="dni">Número de Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese Número de DNI..."
                    name="dni"
                    value={dni}
                    onChange={onInputChange}
                  />
                  {errorsInput.dni && (
                    <ValidateErrors errors={errorsInput.dni} />
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-8">
                  <label htmlFor="nombre">Nombre Completo </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ingrese Nombre Completo..."
                    value={nombre}
                    onChange={onInputChange}
                  />
                  {errorsInput.nombre && (
                    <ValidateErrors errors={errorsInput.nombre} />
                  )}{" "}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="celular">Número de Celular </label>
                  <input
                    type="text"
                    className="form-control"
                    name="celular"
                    placeholder="Ingrese Número Telefónico Celular..."
                    value={celular}
                    onChange={onInputChange}
                  />
                  {errorsInput.celular && (
                    <ValidateErrors errors={errorsInput.celular} />
                  )}{" "}
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Ingrese el Correo Electónico.."
                    value={email}
                    onChange={onInputChange}
                  />
                  {errorsInput.email && (
                    <ValidateErrors errors={errorsInput.email} />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="academia">Académia</label>
                  <select
                    className="form-control"
                    name="academia"
                    value={academia}
                    onChange={onInputChange}
                  >
                    <option>Seleccione una opción....</option>
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
                <div className="form-group">
                  <label htmlFor="adress">Dirección de Habitación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adress"
                    placeholder="Indique Dirección de Habitación..."
                    value={adress}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="btn-submit mt-4">
                {edit ? (
                  <button type="submit" className="btn btn-primary w-100">
                    Actualizar
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success w-100">
                    Agregar
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
