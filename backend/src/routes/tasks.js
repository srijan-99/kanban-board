import express from "express";
import {
  updateTask,
  moveTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.patch("/:id", updateTask);
router.put("/:id/move", moveTask);
router.delete("/:id", deleteTask);

export default router;
