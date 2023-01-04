import express from "express";
import {imageProcessorController} from "../controllers/image-processor.controller";

const routes = express.Router();

routes.get("/", imageProcessorController);

export default routes;
