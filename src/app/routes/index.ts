import { Router } from "express";
import { SpecialtyRouter } from "../specialty/specialty.router"
import { AuthRouter } from "../auth/auth.router";

const router = Router();

router.use("/specialty", SpecialtyRouter)
router.use("/auth", AuthRouter)

export const IndexRouter = router;