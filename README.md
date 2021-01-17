# API Weather forecast

Api de test en Node.js

## Estructura de carpetas implementada:

* src/app.js -> archivo principal, mediante el cual se levanta la api. En él se configura la ruta base (/v1) y además se ejecutan los test de los endpoints.
* src/api/ -> contiene los controllers: manejan toda la lógica detrás de los parámetros de solicitud , consulta, envío de respuestas con los códigos correctos, etc.
* src/routes/ -> contiene el archivo index.js que arma la ruta base y el archivo weather.js que arma las url de los endpoints y los mapea hacias las acciones de los        controladores.
* src/config/ -> contiene las url y api keys necesarias para utilizar IP-API y OpenWeatherApi.
* src/services/ -> contiene la logica de negocio necesaria y las llamadas a los servicios externos.
