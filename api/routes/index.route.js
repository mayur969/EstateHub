import { Router } from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import postRoute from "./post.route.js";
import chatRoute from "./chat.route.js";
import messageRoute from "./message.route.js";

const router = Router();

router.use("/auth" ,authRoute);
router.use("/user" ,userRoute);
router.use("/post" ,postRoute);
router.use("/chats" ,chatRoute);
router.use("/message" ,messageRoute);

export default router;