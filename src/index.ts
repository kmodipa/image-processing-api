import express from "express";
import routes from "./routes/index.router"

const app = express();

const port = 5000;

app.use("/api", routes);

app.listen(port, () => {
    console.log('Listerning on port: ' + port);
})
