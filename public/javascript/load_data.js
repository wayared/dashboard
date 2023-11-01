import {
  tiempoArr,
  precipitacionArr,
  uvArr,
  temperaturaArr,
} from "./static_data.js";

let fechaActual = () => new Date().toISOString().slice(0, 10);

let cargarPrecipitacion = () => {
  //Obtenga la función fechaActual
  //Defina un arreglo temporal vacío
  //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue
  //Actualice los elementos HTML con los valores correspondientes
};

cargarPrecipitacion();
