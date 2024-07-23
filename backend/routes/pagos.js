const express = require("express");
const {
  postPago,
  deletePagos,
  updatePagos,
} = require("../controllers/pagos.js");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json());
router.post("/", upload.single("file"), postPago);

module.exports = router;
