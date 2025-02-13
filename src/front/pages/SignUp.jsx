import React, { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado con éxito:", data);
        alert("Usuario creado con éxito");
        // Redirigir a /login o donde quieras
      } else {
        const errorData = await response.json();
        console.log("Error al crear usuario:", errorData);
        alert(errorData.msg || "Error al crear usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
