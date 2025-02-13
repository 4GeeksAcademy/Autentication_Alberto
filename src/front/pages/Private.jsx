import React, { useEffect, useState } from "react";

export const Private = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token en Private:", token);
    if (!token) {
      window.location.href = "/login";
    } else {
      // Si hay token, intentar acceder a la ruta protegida
      fetch(`${process.env.BACKEND_URL}/api/private`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((resp) => {
          if (resp.ok) return resp.json();
          else throw resp;
        })
        .then((data) => {
          setMessage(data.msg);
          setUserData(data.user);
        })
        .catch((error) => {
          console.error("Error en la petición:", error);
          // si el token no es válido, redirigir
          window.location.href = "/login";
        });
    }
  }, []);
  

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Página Privada</h1>
      <p>{message}</p>
      {userData && (
        <div>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};
