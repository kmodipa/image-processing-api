import express from "express";
import { ImageProcessorController } from "../controllers/image-processor.controller";

const routes = express.Router();

routes.get("/resize", ImageProcessorController.resizeImage);

export default routes;
