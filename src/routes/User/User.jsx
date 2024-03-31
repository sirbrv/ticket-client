import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { useAppContext } from "../../hooks/appContext";

import Swal from "sweetalert2";
import validationSchema from "../../componets/services/validationUserSchema";

// import "./user.css";

export default function User({ user, edit, riviewList }) {
  const { HandleNivelClose } = useAppContext();
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user`;
  const [error, setError] = useState(false);
  const initialForm = {
    id: user ? user.id : "",
    nombre: user ? user.nombre : "",
    apellido: user ? user.apellido : "",
    email: user ? user.email : "",
    password: user ? user.pasword : "",
    confirmPassword: "",
    adress: user ? user.adress : "",
    adress2: user ? user.adress2 : "",
    city: user ? user.city : "",
    state: user ? user.state : "",
    zip: user ? user.zip : "",
    confirm: user ? user.confirm : false,
  };

  const { formData, onInputChange, validateForm, errorsInput, clearForm } =
    useForm(initialForm, validationSchema);

  const {
    id,
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    adress,
    adress2,
    city,
    state,
    zip,
    confirm,
  } = formData;

  let { data, isLoading, getData, createData, updateData } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      let url = `${api}`;
      if (!edit) {
        await createData(url, formData);
      } else {
        await updateData(url, user.id, formData);
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
      data?.data.message &&
        Swal.fire({
          position: "top",
          icon: "success",
          title: data?.data?.message,
          showConfirmButton: false,
          timer: 3500,
        });
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

  return (
    <>
      {
        // isLoading ? (
        // <h3>Cargado..</h3>
        // ):
        error ? (
          errorMessage()
        ) : (
          <div className="container p-5">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="nombre">Nombres </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ingrese Nombres"
                    value={nombre}
                    onChange={onInputChange}
                  />
                  {errorsInput.nombre && (
                    <ValidateErrors errors={errorsInput.nombre} />
                  )}{" "}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputName">Apelliodos </label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Ingrese Apellidos"
                    value={apellido}
                    onChange={onInputChange}
                  />
                  {errorsInput.apellido && (
                    <ValidateErrors errors={errorsInput.apellido} />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Ingrese el Coreo Electónico"
                    value={email}
                    onChange={onInputChange}
                  />
                  {errorsInput.email && (
                    <ValidateErrors errors={errorsInput.email} />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Indique su contraseña"
                    value={password}
                    onChange={onInputChange}
                  />
                  {errorsInput.password && (
                    <ValidateErrors errors={errorsInput.password} />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="confirmPassword">
                    Confirmación de Contraseña
                  </label>
                  <input
                    type="confirmPassword"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Indique su contraseña"
                    value={confirmPassword}
                    onChange={onInputChange}
                  />
                  {errorsInput.confirmPassword && (
                    <ValidateErrors errors={errorsInput.confirmPassword} />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="adress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="adress"
                  placeholder="Indique su dirección principal"
                  value={adress}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adress2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  name="adress2"
                  placeholder="Apartment, studio, or floor"
                  value={adress2}
                  onChange={onInputChange}
                />
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={onInputChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    className="form-control"
                    value={state}
                    onChange={onInputChange}
                  >
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    name="zip"
                    value={zip}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="confirm"
                    value={confirm}
                    onChange={onInputChange}
                  />
                  <label className="form-check-label" htmlFor="confirm">
                    Acepta las condiciones y términos de la empresa
                  </label>
                </div>
              </div>
              {edit ? (
                <button type="submit" className="btn-segundary">
                  Actualizar
                </button>
              ) : (
                <button type="submit" className="btn-danger">
                  Agregar
                </button>
              )}
            </form>
          </div>
        )
      }
    </>
  );
}
