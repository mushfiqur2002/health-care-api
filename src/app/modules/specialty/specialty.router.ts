import { Router } from "express";
import { SpecialtyController } from "./specialty.controller"
const router = Router();

// get all
router.get("/", SpecialtyController.getSpecialty);

// get by id
router.get("/:id", SpecialtyController.getSpecialtyByID);

// delete by id
router.delete("/:id", SpecialtyController.deleteSpecialtyByID);

// create
router.post("/", SpecialtyController.createSpecialty);

export const SpecialtyRouter = router;
