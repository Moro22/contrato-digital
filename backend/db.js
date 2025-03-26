const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Cambia si usas otro usuario
    password: "1234321", // Si tienes contraseña, ponla aquí
    database: "contrato_digital"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a MySQL:", err);
    } else {
        console.log("✅ Conectado a MySQL correctamente");
    }
});

module.exports = db;
