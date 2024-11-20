import { Router } from "express";
import { createSave,savedCardList } from "../controllers/save.controllers.js";

import { upload } from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createsave").post(createSave);
router.route("/savelist").post(savedCardList);
// router.route("/pdf").get(PDF);
// router.route("/signin").post(loginUser);

//secured routes
// router.route("/redirect").post(verfiyJWT,authRedirect);
// router.route("/signout").post(verfiyJWT,logoutUser);
// router.route("/refresh").post(refreshAccessToken);

export default router