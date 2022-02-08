import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({}).populate("projects");

    return res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate("projects");

    return user ? res.json(user) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, password, about, profileImage } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = User.build({
      fullName,
      password: passwordHash,
      about,
      profileImage,
      projects: [],
    });

    await user.save();

    return res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
});

export { router as userRouter };
