import { Router } from "express";
import { SpecialtyRouter } from "../specialty/specialty.router"
import { AuthRouter } from "../auth/auth.router";
import { UserRouter } from "../user/user.router";
import { DoctorRouter } from "../doctor/doctor.route";

const router = Router();

router.use("/specialty", SpecialtyRouter)
router.use("/auth", AuthRouter)
router.use("/user", UserRouter)
router.use("/doctor", DoctorRouter)

export const IndexRouter = router;