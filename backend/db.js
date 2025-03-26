const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "ballast.proxy.rlwy.net",
    port: 20038,
    user: "root",
    password: "CVwyAcKVWZnYSibVGiNfLgyStTPvclmr",
    database: "railway"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a Railway MySQL:", err);
    } else {
        console.log("✅ Conectado a Railway MySQL correctamente");
    }
});

module.exports = db;
