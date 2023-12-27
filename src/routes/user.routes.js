const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getAll);
router.post("/add", userController.create);

router
  .route("/:id")
  .get(userController.getById)
  .delete(userController.deleteById);

module.exports = router;
