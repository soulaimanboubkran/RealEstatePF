import express from 'express'
import { SignIn, SignUp, signOut } from '../Controllers/auth.controller.js';



const router = express.Router()


router.post('/sign-up',SignUp)
router.post('/sign-in',SignIn)
router.get("/signout",signOut);
export default router;