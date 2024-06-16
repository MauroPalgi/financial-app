const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const os = require("os");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
// Configuración de multer para manejar la carga de archivos
const upload = multer({ dest: os.tmpdir() });

app.post("/process-excel", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Procesar los datos del archivo Excel aquí

  fs.unlinkSync(req.file.path); // Eliminar el archivo temporal
  console.log({ jsonData });
  res.send(jsonData); // Enviar datos procesados de vuelta al cliente
});

app.post("/process-pdf", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const dataBuffer = fs.readFileSync(filePath);

  try {
    const data = await pdfParse(dataBuffer);
    fs.unlinkSync(filePath); // Eliminar el archivo temporal
    res.send(data.text); // Enviar texto extraído de vuelta al cliente
  } catch (error) {
    fs.unlinkSync(filePath); // Eliminar el archivo temporal
    res.status(500).send("Failed to process the PDF file.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
