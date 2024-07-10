const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());

//importamos el router de mercaderias
const mercaderiaRouter=require('./routes/serverRouter');

//middleware para parsear el body de las solicitudes
app.use(express.json());


//definimos la ruta de mercaderias
app.use("/mercaderias",mercaderiaRouter);

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de mercaderias");
});

//inicializamos el servidor
app.listen(PORT,()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`); 
});
