import React, { useState, useEffect } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function CambioClave() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    await axios
      .put(
        `${server}/admin/user/cambio`,
        { email: user[0].email, oldPassword, newPassword, confirmPassword },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        if (parseInt(res.data.status) === 200) {
          toast.success(`${res.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
        if (parseInt(res.data.status) !== 200) {
          toast.warning(`${res.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2 className="text-center mb-4">Cambio de Contraseña</h2>
          <div className="p-5 card shadow w-100">
            <div className="card-body">
              <form
                aria-required
                onSubmit={passwordChangeHandler}
                className="flex flex-col items-center"
              >
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">
                    Contraseña Actual
                  </label>
                  <div className="input-group">
                    <input
                      type={visible ? "text" : "password"}
                      name="oldPassword"
                      autoComplete="current-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className=" w-[100%] 800px:w-[70%] mt-2 relative">
                  <label htmlFor="newPassword" className="form-label">
                    Nueva Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={visible1 ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      required
                      autoComplete="on"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className=" w-[100%] 800px:w-[70%] mt-2 relative">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirme la Nueva Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={"password"}
                      className="form-control"
                      required
                      autoComplete="on"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                  <input
                    className="btn btn-primary w-100 mt-5"
                    required
                    value="Guardar"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambioClave;
