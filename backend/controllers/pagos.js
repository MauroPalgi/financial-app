const xlsx = require("xlsx");
const { Readable } = require("stream");
const querystring = require("querystring");
const { procesarExcelBROU } = require("../helpers/UTILS");

const postPago = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const queryParams = querystring.parse(req.url.split("?")[1]);

  try {
    // Crear un stream a partir del buffer del archivo
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    // Leer el archivo Excel desde el stream en memoria
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    res.json(procesarExcelBROU(data, queryParams.tipo));
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
};

module.exports = { postPago };
