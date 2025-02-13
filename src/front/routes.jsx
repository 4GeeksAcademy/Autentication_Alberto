// Import necessary components and functions from react-router-dom.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

// NUEVO: importar las páginas creadas
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
          <Route path="/" element={<Home />} />
          <Route path="/single/:theId" element={<Single />} />
          <Route path="/demo" element={<Demo />} />

          {/* NUEVO: Rutas para signup, login y private */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/private" element={<Private />} />
      </Route>
  )
);
