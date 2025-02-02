import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Configuración de CORS para permitir cookies entre dominios
app.use(
  cors({
    origin: "https://front-cookie.vercel.app", // Tu frontend en Vercel
    credentials: true, // Permite el envío de cookies
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ title: "prueba mundos" });
});

// Ruta para establecer la cookie
app.get("/setcookie", (req, res) => {
  res.cookie("xabiToken", "my new cookie", {
    httpOnly: false, // Permite acceso desde JS
    maxAge: 7000,
    sameSite: "None", // Necesario para cookies cross-origin
    secure: process.env.NODE_ENV === "production", // Solo usar HTTPS en producción
  });
  res.send("Hello Token");
});

// Ruta para obtener la cookie
app.get("/getcookie", (req, res) => {
  if (!req.cookies.xabiToken) return res.send("NO HAY COOKIE");
  res.send(req.cookies.xabiToken);
});

// Ruta para eliminar la cookie
app.get("/deletecookie", (req, res) => {
  res.clearCookie("xabiToken", {
    httpOnly: false, // Asegúrate de que coincida con la configuración inicial de la cookie
    secure: process.env.NODE_ENV === "production", // Asegúrate de que sea igual
    sameSite: "None", // Coincide con la configuración de SameSite
  });
  res.send("Cookie eliminada");
});

app.listen(3000, () => {
  console.log("Servidor en el puerto 3000");
});
