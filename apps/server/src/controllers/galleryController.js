import { createCrudController } from "./crudFactory.js";
import Gallery from "../models/Gallery.js";

const baseController = createCrudController(Gallery);

export const getPublicGallery = async (req, res, next) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAll = baseController.getAll;
export const create = baseController.create;
export const update = baseController.update;
export const remove = baseController.remove;
