const db=require('../db/db'); 

const ObtenerTodasLasMercaderias = (req, res) => {
    const sql='SELECT * FROM mercaderia';
    
    db.query(sql, (error, result) => {
        
        if (error) {
            throw error;
            //console.log('Error al obtener las mercaderias');
            //return;
        }
        res.json(result);
    });
}

const ObtenerMercaderiaPorId = (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM mercaderia WHERE idMercaderia = ?`

    db.query(sql, [id], (error, result) => {
        if (error) {
            throw error;
        }
        res.json(result);
    });
}

const CrearMercaderia = (req, res) => {
    const {nombre, precio, imagen, tipoMercaderia_idTipoMercaderia} = req.body;
    const sql = `INSERT INTO mercaderia (nombre, precio, imagen, tipoMercaderia_idTipoMercaderia) VALUES (?,?,?,?)`;

    db.query(sql, [nombre, precio, imagen, tipoMercaderia_idTipoMercaderia], (error, result) => {
        if (error) {
            throw error;
        }
        res.json(
            {
                mensaje: 'Mercaderia creada correctamente',
                idMercaderia: result.insertId
            });
    });
}

const ActualizarMercaderia = (req, res) => {
    const {id} = req.params;
    const {nombre, precio, imagen, tipoMercaderia_idTipoMercaderia} = req.body;
    const sql = `UPDATE mercaderia SET nombre = ?, precio = ?, imagen = ?, tipoMercaderia_idTipoMercaderia = ? WHERE idMercaderia = ?`;

    if (!nombre || !precio || !imagen || !tipoMercaderia_idTipoMercaderia) {
        res.status(400).json({ mensaje: 'Por favor, complete todos los campos.' });
        return;
    }
    
    db.query(sql, [nombre, precio, imagen, tipoMercaderia_idTipoMercaderia, id], (error, result) => {
        if (error) {
            throw error;
        }
        res.json({mensaje: 'Mercaderia actualizada correctamente'});
    });
}

const EliminarMercaderia = (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM mercaderia WHERE idMercaderia = ?`;

    db.query(sql, [id], (error, result) => {
        if (error) {
            throw error;
        }
        res.json({mensaje: 'Mercaderia eliminada correctamente'});
    });
}


module.exports = 
{
    ObtenerTodasLasMercaderias,
    ObtenerMercaderiaPorId,
    CrearMercaderia,
    ActualizarMercaderia,
    EliminarMercaderia
}