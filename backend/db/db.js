const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'franco051',
    database: 'restaurante'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos', error);
        return;
    }
    console.log('Conectado a la base de datos');

    connection.query('CREATE DATABASE IF NOT EXISTS restaurante', (error, result) => {
        if (error) {
            console.error('Error al crear la base de datos', error);
            return;
        }
        console.log('Base de datos creada');

        connection.changeUser({ database: 'restaurante' }, (error) => {
            if (error) {
                console.error('Error al cambiar de base de datos', error);
                return;
            }
            console.log('Base de datos cambiada');

            const createTableTipoMercaderia = `
                CREATE TABLE IF NOT EXISTS tipoMercaderia (
                    idTipoMercaderia INT PRIMARY KEY AUTO_INCREMENT,
                    nombre VARCHAR(50) NOT NULL
                );
            `;
            const createTableMercaderia = `
                CREATE TABLE IF NOT EXISTS mercaderia (
                    idMercaderia INT PRIMARY KEY AUTO_INCREMENT,
                    nombre VARCHAR(50) NOT NULL,
                    precio DECIMAL(10,2) NOT NULL,
                    imagen VARCHAR(255) NOT NULL,
                    tipoMercaderia_idTipoMercaderia INT NOT NULL
                );
            `;

            connection.query(createTableTipoMercaderia, (error, result) => {
                if (error) {
                    console.error('Error al crear la tabla tipoMercaderia:', error);
                    return;
                }
                console.log('Tabla tipoMercaderia creada o ya existe');
            });

            connection.query(createTableMercaderia, (error, result) => {
                if (error) {
                    console.error('Error al crear la tabla mercaderia:', error);
                    return;
                }
                console.log('Tabla mercaderia creada o ya existe');
            });
        });
    });
});

module.exports = connection;
