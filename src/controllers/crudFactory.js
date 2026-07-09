// A small factory that generates standard CRUD handlers for a given Mongoose model.
// Keeps eventController/teamController/alumniController thin and consistent.

export function createCrudController(Model, { sortBy = "-createdAt" } = {}) {
  return {
    async getAll(req, res, next) {
      try {
        const items = await Model.find().sort(sortBy);
        res.json(items);
      } catch (err) {
        next(err);
      }
    },

    async getOne(req, res, next) {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      } catch (err) {
        next(err);
      }
    },

    async create(req, res, next) {
      try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      } catch (err) {
        next(err);
      }
    },

    async remove(req, res, next) {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
      } catch (err) {
        next(err);
      }
    },
  };
}
