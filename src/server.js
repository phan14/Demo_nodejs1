import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routers/web";
require("dotenv").config();
import bodyParser from "body-parser";
import initApiRoutes from "./routers/api";
import configCors from "./config/cors";



// import connection from "./config/conectDB";

const app = express();
const PORT = process.env.PORT || 8080;

//configCors
configCors(app)




//config view
configViewEngine(app);


//config body-panser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
// connection();

// init web routeer
initWebRoutes(app);
initApiRoutes(app)

app.listen(PORT, () => {
  console.log(">>> jwt backend is runing =" + PORT);
});
