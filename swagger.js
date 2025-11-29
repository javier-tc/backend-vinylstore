import swaggerAutogen from "swagger-autogen";
const doc = {
info: {
title: "API Vinylstore",
description: "Documentación de la API de Vinylstore",
},
host: "98.89.63.203:3000",
schemes: ["http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];
swaggerAutogen()(outputFile, endpointsFiles, doc);


