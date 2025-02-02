import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors({ origin: "https://front-cookie.vercel.app", credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({ title: "prueba mundo" });
});
app.get("/setcookie", (req, res) => {
  res.cookie("xabiToken", "my new cookie", {
    httpOnly: false,
    maxAge: 10000,
    sameSite: "none",
    secure: true,
  });
  res.send("Hello Token");
});
app.get("/getcookie", (req, res) => {
  if (!req.cookies.xabiToken) return res.send("NO HAY COOKIE");
  res.send(req.cookies.xabiToken);
});

app.get("/deletecookie", (req, res) => {
  res.clearCookie("xabiToken", {
    httpOnly: false, // Asegúrate de que coincida con la configuración inicial de la cookie
    secure: true, // Si usas HTTPS, esta opción debe ser true
    sameSite: "None", // Debe coincidir con la configuración de SameSite de la cookie
  });
  res.send("cookie eliminada");
});

app.listen(3000);
console.log("Servidor en port 3000");
