const { Router } = require("express");
const router = Router();

const taskController = require("../controllers/task.controller");

router.get("/", taskController.getAll);
router.post("/add", taskController.create);

router
  .route("/:id")
  .get(taskController.getById)
  .put(taskController.updateById)
  .delete(taskController.deleteById);

module.exports = router;
