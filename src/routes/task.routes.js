const { Router } = require('express');
const router = Router();

const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAll);
router.post('/add', taskController.create);

//Use as Admin Only (custom optimization)
router.post('/batch', taskController.customBatch);

router
  .route('/:id')
  .get(taskController.getById)
  .put(taskController.updateById)
  .delete(taskController.deleteById);

module.exports = router;
