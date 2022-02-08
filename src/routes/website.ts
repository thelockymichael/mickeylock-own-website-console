import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IWebsite, Website } from "../models";

interface CustomRequest<T> extends Request {
  body: T;
}

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const website = await Website.findOne({}).populate("projects");

    return website ? res.status(200).send(website) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

// TODO
// Don't remove. Might need this later
// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, descText, aboutText, profileImage, projects } = req.body;

//     const website = Website.build({
//       name,
//       descText,
//       aboutText,
//       profileImage,
//       projects,
//     });

/* END */

// 4. UPDATE single item
router.put(
  "/:id",
  async (req: CustomRequest<IWebsite>, res: Response, next: NextFunction) => {
    try {
      // const { name, score } = req.body;
      const updateWebsite = req.body;

      const website = await Website.findByIdAndUpdate(
        req.params.id,
        updateWebsite,
        { new: true }
      );

      return website
        ? res.status(200).json({
            code: 200,
            message: "Website updated",
            updatedWebsite: website,
          })
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

export { router as websiteRouter };
