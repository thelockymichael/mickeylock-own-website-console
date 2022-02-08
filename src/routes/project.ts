import express, { NextFunction, Request, Response } from "express";
import { IUser, Project, User } from "../models";

require("express-async-errors");

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const project = await Project.find({});

  return res.status(200).send(project);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  // TODO
  // !!! Setup eslint . !!!

  return project ? res.json(project.toJSON()) : res.status(404).end();
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, name, tags, description } = req.body;

    const project = Project.build({
      name,
      description,
      tags,
      date: new Date(),
      user: userId._id,
    });

    const savedProject = await project.save();

    // Find user by ID
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { projects: project },
      }
    );

    return res.status(200).send(savedProject);
  } catch (error: any) {
    next(error);
  }
});

export { router as projectRouter };
