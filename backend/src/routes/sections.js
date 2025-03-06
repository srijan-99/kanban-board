import express from "express";
import {
  getAllSections,
  createSection,
} from "../controllers/sectionController.js";
import { createTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllSections);
router.post("/", createSection);
router.post("/:sectionId/tasks", createTask);

export default router;
