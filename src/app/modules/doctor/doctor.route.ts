import { Router } from "express"
import { DoctorController } from "./doctor.controller";


const router = Router()

router.get("/", DoctorController.getAllDoctor)
router.get("/:id", DoctorController.getDoctorByID)



export const DoctorRouter = router;