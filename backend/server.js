const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const db = require("./db");
const generarPDF = require("./generarContrato"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  Configuración para subir firmas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, "firma_" + Date.now() + ".png");
    }
});

const upload = multer({ storage: storage });

//  Ruta principal para generar contrato
app.post("/generar-contrato", upload.single("firma"), async (req, res) => {
    try {
        const data = req.body;

        // Convertir firma en base64
        if (req.file) {
            const firmaFullPath = path.join(__dirname, "uploads", req.file.filename);
            if (fs.existsSync(firmaFullPath)) {
                const firmaData = fs.readFileSync(firmaFullPath);
                data.firma = `data:image/png;base64,${firmaData.toString("base64")}`;
            }
        }

        const fs = require("fs");
        const path = require("path");

        const rutaFirma = path.join(__dirname, "firma_prove.png");

        if (fs.existsSync(rutaFirma)) {
            const firmaBuffer = fs.readFileSync(rutaFirma);
            data.firma_proveedor = `data:image/png;base64,${firmaBuffer.toString("base64")}`;
            }
         else {
         console.error(" No se encontró el archivo 'firma.png'");
        }

        // Generar PDF con pdfmake
        const pdfFullPath = await generarPDF(data);
        const pdfPath = path.relative(__dirname, pdfFullPath).replace(/\\/g, "/"); //  ruta relativa para guardar

        console.log(" PDF generado correctamente:", pdfPath);


        const sql = `
        INSERT INTO contratos (
            tipo_persona, nombre, representante,
            calle, numero_exterior, numero_interior, colonia, alcaldia_municipio, estado, codigo_postal,
            tipo_telefono, telefono,
            rfc,
            descripcion_paquete, folio_ift, total_mensualidad, tarifa_reconexion, fecha_pago_servicio,
            comodato, marca, modelo, numero_serie, numero_equipos,
            tipo_instalacion, direccion_instalacion, fecha_instalacion, hora_instalacion, costo_instalacion,
            metodo_pago, datos_metodo_pago,
            nombre_servicio_1, descripcion_servicio_1, costo_servicio_1,
            nombre_servicio_2, descripcion_servicio_2, costo_servicio_2,
            nombre_concepto_1,descripcion_concepto_1,costo_concepto_1,
            nombre_concepto_2,descripcion_concepto_2,costo_concepto_2,
            autorizacion_factura, autorizacion_carta, autorizacion_contrato, correo_autorizado,
            autorizacion_informacion_terceros, acepta_llamadas_promociones,
            firma, pdf
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            data.tipo_persona || null,
            data.nombre || null,
            data.representante || null,
            data.calle || null,
            data.numero_exterior || null,
            data.numero_interior || null,
            data.colonia || null,
            data.alcaldia_municipio || null,
            data.estado || null,
            data.codigo_postal || null,
            data.tipo_telefono || null,
            data.telefono || null,
            data.rfc || null,
            data.descripcion_paquete || null,
            data.folio_ift || null,
            parseFloat(data.total_mensualidad) || null,
            data.tarifa_reconexion || null,
            data.fecha_pago_servicio || null,
            data.comodato || null,
            data.marca || null,
            data.modelo || null,
            data.numero_serie || null,
            parseInt(data.numero_equipos) || null,
            data.tipo_instalacion || null,
            data.direccion_instalacion || null,
            data.fecha_instalacion || null,
            data.hora_instalacion || null,
            parseFloat(data.costo_instalacion) || null,
            data.metodo_pago || null,
            data.datos_metodo_pago || null,
            data.nombre_servicio_1 || null,
            data.descripcion_servicio_1 || null,
            parseFloat(data.costo_servicio_1) || null,
            data.nombre_servicio_2 || null,
            data.descripcion_servicio_2 || null,
            parseFloat(data.costo_servicio_2) || null,
            data.nombre_concepto_1 || null,
            data.descripcion_concepto_1 || null,
            parseFloat(data.costo_concepto_1) || null,
            data.nombre_concepto_2 || null,
            data.descripcion_concepto_2 || null,
            parseFloat(data.costo_concepto_2) || null,
            data.autorizacion_factura || null,
            data.autorizacion_carta || null,
            data.autorizacion_contrato || null,
            data.correo_autorizado || null,
            data.autorizacion_informacion_terceros || null,
            data.acepta_llamadas_promociones || null,
            req.file ? req.file.filename : null,
            pdfPath || null
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(" Error al guardar en MySQL:", err);
                return res.status(500).json({ message: "Error al guardar contrato" });
            }
            console.log(" Contrato guardado en la base de datos:", result.insertId);
            res.json({ message: "Contrato generado y guardado con éxito", pdfPath });
        });

    } catch (error) {
        console.error(" Error en el proceso:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

app.get("/contratos", (req, res) => {
    const sql = `
      SELECT 
        id,
        nombre,
        descripcion_paquete AS paquete,
        fecha_pago_servicio AS fecha_pago,
        pdf
      FROM contratos
      ORDER BY id DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(" Error al obtener contratos:", err);
        return res.status(500).json({ error: "Error al obtener contratos" });
      }
      res.json(results);
    });
  });
  
  const nodemailer = require("nodemailer");

app.post("/enviar-contrato", async (req, res) => {
  const { correo, pdfPath, nombre } = req.body;

  if (!correo || !pdfPath) {
    return res.status(400).json({ error: "Correo y PDF requeridos" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "a3521110470@alumno.uttehucan.edu.mx",
      pass: "ypbl iuqq atft gkkn"
    }
  });



  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "📧 Correo enviado exitosamente" });
  } catch (error) {
    console.error(" Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar correo" });
  }
});

app.listen(3000, () => {
    console.log(" Servidor corriendo en el puerto 3000");
});
