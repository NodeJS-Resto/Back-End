//1-Importamos los modulos necesarios   
const express= require('express');
const router = express.Router();
const mercaderiaController = require('../controller/mercaderiaController');


router.get('/', mercaderiaController.ObtenerTodasLasMercaderias);
router.get('/:id', mercaderiaController.ObtenerMercaderiaPorId);
router.post('/', mercaderiaController.CrearMercaderia);
router.put('/:id', mercaderiaController.ActualizarMercaderia);
router.delete('/:id', mercaderiaController.EliminarMercaderia);

module.exports = router;




/*
const fs=require('fs');
const path= require('path');
//const app=express();

//2- Inicializamos el router
const mercaderiaRouter = express.Router();

//3- Definimos la ruta del archivo de mercaderias
const mercaderiaPath=path.join(__dirname,'../public/Mercaderia.json');

//4-Damos formato al archivo json y parseamos el contenido  
const archivoJSON=fs.readFileSync(mercaderiaPath,'utf-8');
const mercaderia=JSON.parse(archivoJSON);

//5- Definimos las rutas

//Ruta para obtener todas las mercaderias http://localhost:3000/mercaderias/list
mercaderiaRouter.get('/list', (req, res) => {
    res.json(mercaderia);
});

//Ruta para obtener una mercaderia por su id http://localhost:3000/mercaderias/1
mercaderiaRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mercaderiaID = mercaderia.find((mercaderia) => mercaderia.idMercaderia == id);
    
    if (!mercaderiaID) {

        const estado404= res.status(404);
        return estado404.send('Mercaderia no encontrada');
        //res.status(404).json({ mensaje: 'Mercaderia no encontrada' });
    }

    res.json(mercaderiaID);
});

//Ruta para crear una mercaderia http://localhost:3000/mercaderias/
mercaderiaRouter.post('/', (req, res) => {
    
//creamos un objeto con los datos que vienen en el body
    const nuevaMercaderia = {
        idMercaderia: mercaderia.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.body.imagen,
        tipoMercaderia_idTipoMercaderia: req.body.tipoMercaderia_idTipoMercaderia
    };
    mercaderia.push(nuevaMercaderia);

    //convertimos el array de mercaderias en un string JSON
    const mercaderiaActulizado=JSON.stringify(mercaderia,null,2);

    //guardamos el array de mercaderias en el archivo JSON
    fs.writeFileSync(mercaderiaPath,mercaderiaActulizado,'utf-8');

    //enviamos la respuesta al cliente
    res.status(201).json({
        mensaje: 'Mercaderia creada',
        mercaderia: nuevaMercaderia
    });
});

//Ruta para actualizar una mercaderia http://localhost:3000/mercaderias/1
mercaderiaRouter.put("/:id", (req, res) => {

    const mercaderiaActualizada = mercaderia.find(m => m.idMercaderia === parseInt(req.params.id));
    
    if (!mercaderiaActualizada) {
      return res.status(404).send("Mercaderia no encontrada");
    }
    
    mercaderiaActualizada.nombre = req.body.nombre || mercaderiaActualizada.nombre;
    mercaderiaActualizada.precio = req.body.precio || mercaderiaActualizada.precio;
    mercaderiaActualizada.imagen = req.body.imagen || mercaderiaActualizada.imagen;
    mercaderiaActualizada.tipoMercaderia_idTipoMercaderia = req.body.tipoMercaderia_idTipoMercaderia || mercaderiaActualizada.tipoMercaderia_idTipoMercaderia;

    // Convertimos el array de mercaderias en un string JSON
    const mercaderiasActualizadas = JSON.stringify(mercaderia, null, 2);
    // Guardamos el archivo actualizado
    fs.writeFileSync(mercaderiaPath, mercaderiasActualizadas, "utf-8");
    // Enviamos la respuesta al cliente
    res.json({
        mensaje: "Mercaderia actualizada correctamente",
        mercaderia: mercaderiaActualizada
    });
});
//Ruta para eliminar una mercaderia http://localhost:3000/mercaderias/1
mercaderiaRouter.delete("/:id", (req, res) => {

    // mediante el método DELETE
    const mercaderiaEliminada = mercaderia.find(m => m.idMercaderia === parseInt(req.params.id));
    if (!mercaderiaEliminada) {
        return res.status(404).send("Mercaderia no encontrada");
    }
  
    // Eliminamos la película del array
    const mercaderiaIndex = mercaderia.indexOf(mercaderiaEliminada);
    mercaderia.splice(mercaderiaIndex, 1);
  
    // Actualizamos el archivo JSON
    // Convertimos el array a un string JSON
    const mercaderiasActualizada = JSON.stringify(mercaderia, null, 2);
    // Guardamos el archivo actualizado
    fs.writeFileSync(mercaderiaPath, mercaderiasActualizada, "utf-8");
    // Enviamos la respuesta al cliente
    res.json({
      mensaje: "Mercaderia eliminada correctamente",
      mercaderia: mercaderiaEliminada
    });
  });

module.exports = mercaderiaRouter;
*/