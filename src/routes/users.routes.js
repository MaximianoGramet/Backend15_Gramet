import { Router } from "express";

const router = Router();

router.get("/premium/:uid", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/users/login");
  }
  try {
    const userId = req.params.uid;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!req.files || req.files.length >= 3) {
      return res
        .status(400)
        .json({ status: "error", message: "You must attach 3 files or more" });
    }

    user.roll = user.roll === "user" ? "premium" : "user";
    await user.save();

    res.render("profile", { user: new UserDto(user) });
  } catch (error) {
    console.error("Error at changing user roll:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/:uid/documents/", uploadMiddleware, async (req, res) => {
  const { fileName, filePath } = req.uploadedFile;
  res.status(200).json({ fileName, filePath });
});

export default router;
