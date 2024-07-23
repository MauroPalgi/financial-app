const excelDate2JsDate = (excelDate) => {
  console.log(excelDate);
  const excelEpoch = new Date(Date.UTC(1900, 0, 1));
  const jsDate = new Date(
    excelEpoch.getTime() + (excelDate - 2) * 24 * 60 * 60 * 1000
  );
  return jsDate.toLocaleDateString("es-ES");
};

function cleanObject(obj) {
  // Crear una copia del objeto para no mutar el original
  const cleanedObj = { ...obj };

  // Recorrer las propiedades del objeto
  Object.keys(cleanedObj).forEach((key) => {
    // Eliminar la propiedad si el valor es una cadena vacía
    if (cleanedObj[key] === "") {
      delete cleanedObj[key];
    }
  });
  console.log(cleanedObj);
  return cleanedObj;
}

const procesarExcelBROU = (excelBROU, tipo) => {
  const registros = [];
  excelBROU.map((e) => {
    const values = Object.values(e);
    const key = Object.keys(e);
    if (
      typeof values[0] == "number" &&
      typeof values[values.length - 1] == "number"
    ) {
      const obj = {};
      for (let i = 0; i < values.length; i++) {
        obj[HEADERS[tipo][key[i]]] =
          i === 0 ? excelDate2JsDate(values[i]) : values[i];
      }
      registros.push(cleanObject(obj));
    }
  });
  return { cabezales: HEADERS[tipo], registros };
};

const HEADERS = {
  BROU: {
    __EMPTY: "Fecha",
    __EMPTY_1: "Descripción",
    __EMPTY_3: "Número de documento",
    __EMPTY_4: "Asunto",
    __EMPTY_5: "Dependencia",
    __EMPTY_6: "Débito",
    __EMPTY_7: "Crédito",
  },
};

module.exports = { excelDate2JsDate, procesarExcelBROU, HEADERS };
