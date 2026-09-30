import { Router } from "express"
import { AuthController } from "./auth.controller"


const router = Router()
// create
router.post("/register", AuthController.registerPatient);
router.post("/log-in", AuthController.logInUser);


export const AuthRouter = router;