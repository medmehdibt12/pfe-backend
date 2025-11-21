import { UserStory } from "../models/userStory.js";
import { Sprint } from "../models/sprint.js";
import AppError from "../utils/AppError.js";

export const createUserStory = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const sprintId = req.params.sprintId;

    if (!title || !description) {
      throw new AppError(
        "USR_CREATE_001",
        "Titre et description sont obligatoires",
        400,
        ["title", "description"]
      );
    }

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      throw new AppError("USR_SPRINT_NOT_FOUND", "Sprint lié inexistant", 404, [
        sprintId,
      ]);
    }

    const userStory = new UserStory({
      title,
      description,
      status: status || "To DO",
      sprint: sprintId,
    });

    await userStory.save();
    res.status(201).json(userStory);
  } catch (error) {
    next(error);
  }
};

export const listUserStories = async (req, res, next) => {
  try {
    const sprintId = req.params.sprintId;
    const sprint = await Sprint.findById(sprintId);

    if (!sprint) {
      throw new AppError("USR_SPRINT_NOT_FOUND", "Sprint lié inexistant", 404, [
        sprintId,
      ]);
    }

    const stories = await UserStory.find({ sprint: sprintId });
    res.status(200).json(stories);
  } catch (error) {
    next(
      new AppError(
        "USR_DB_ERROR",
        "Impossible de récuperer les userStories",
        500,
        [error.message]
      )
    );
  }
};

export const updateUserStory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedStory = await UserStory.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedStory) {
      throw new AppError("USR_NOT_FOUND", "User Story non trouvée", 404, [id]);
    }

    res.status(200).json(updatedStory);
  } catch (error) {
    next(error);
  }
};

export const deleteUserStory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedStory = await UserStory.findByIdAndDelete(id);

    if (!deletedStory) {
      throw new AppError(
        "USR_NOT_FOUND",
        "User Story non trouvée pour suppression",
        404,
        [id]
      );
    }

    res.status(200).json({ message: "User Story supprimée avec succès" });
  } catch (error) {
    next(error);
  }
};
