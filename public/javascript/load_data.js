import {
  tiempoArr,
  precipitacionArr,
  uvArr,
  temperaturaArr,
} from "./static_data.js";

let fechaActual = () => new Date().toISOString().slice(0, 10);

let cargarPrecipitacion = () => {
  //Obtenga la fecha actual
  let actual = fechaActual();

  //Defina un arreglo temporal vacío
  let datos = [];
  //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const precipitacion = precipitacionArr[index];

    if (tiempo.includes(actual)) {
      datos.push(precipitacion);
    }
  }
  //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
  let max = Math.max(...datos);
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0);
  let prom = sum / datos.length || 0;
  //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue

  let precipitacionMinValue = document.getElementById("precipitacionMinValue");
  let precipitacionPromValue = document.getElementById(
    "precipitacionPromValue"
  );
  let precipitacionMaxValue = document.getElementById("precipitacionMaxValue");
  //Actualice los elementos HTML con los valores correspondientes
  precipitacionMinValue.textContent = `Min ${min} [mm]`;
  precipitacionPromValue.textContent = `Prom ${
    Math.round(prom * 100) / 100
  } [mm]`;
  precipitacionMaxValue.textContent = `Max ${max} [mm]`;
};

cargarPrecipitacion();

let cargarFechaActual = () => {
  //Obtenga la referencia al elemento h6
  let coleccionHTML = document.getElementsByTagName("h6");

  let tituloH6 = coleccionHTML[0];

  //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
  tituloH6.textContent = fechaActual();
};

let parseXML = (responseText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  // Referencia al elemento `#forecastbody` del documento HTML

  let forecastElement = document.querySelector("#forecastbody");
  forecastElement.innerHTML = "";

  // Procesamiento de los elementos con etiqueta `<time>` del objeto xml
  let timeArr = xml.querySelectorAll("time");

  timeArr.forEach((time) => {
    let from = time.getAttribute("from").replace("T", " ");

    let humidity = time.querySelector("humidity").getAttribute("value");
    let windSpeed = "";
    let precipitation = "";
    let pressure = "";
    let cloud = "";

    let template = `
          <tr>
              <td>${from}</td>
              <td>${humidity}</td>
              <td>${windSpeed}</td>
              <td>${precipitation}</td>
              <td>${pressure}</td>
              <td>${cloud}</td>
          </tr>
      `;

    //Renderizando la plantilla en el elemento HTML
    forecastElement.innerHTML += template;
  });
};

// Callback async
let selectListener = async (event) => {
  let selectedCity = event.target.value;

  try {
    //API key
    let APIkey = "6e2b8b1cf0e876c2a8cb596350b0daff";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`;

    let response = await fetch(url);
    let responseText = await response.text();

    await parseXML(responseText);
  } catch (error) {
    console.log(error);
  }
};

let loadForecastByCity = () => {
  //Handling event
  let selectElement = document.querySelector("select");
  selectElement.addEventListener("change", selectListener);
};

loadForecastByCity();


let cargarOpenMeteo = () => {

  //URL que responde con la respuesta a cargar
  let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&timezone=auto'; 

  fetch( URL )
    .then(responseText => responseText.json())
    .then(responseJSON => {
        
      //Respuesta en formato JSON
  
      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById('plot1');
  
      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;
  
      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;
  
      //Objeto de configuración del gráfico
      let config = {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [
            {
              label: 'Temperature [2m]',
              data: data, 
            }
          ]
        }
      };
  
      //Objeto con la instanciación del gráfico
      let chart1  = new Chart(plotRef, config);
  
    })
    
    .catch(console.error);

}


cargarPrecipitacion()
cargarFechaActual()
cargarOpenMeteo()