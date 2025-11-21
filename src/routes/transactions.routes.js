const router = require('express').Router();
const ctrl = require('../controllers/transactions.controller');
const validate = require('../validation/validate');
const { TransactionSchema } = require('../validation/transactions.schema');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

router.post('/', isAuthenticated, validate(TransactionSchema), ctrl.create);
router.put(
  '/:id',
  isAuthenticated,
  validate(TransactionSchema.partial()),
  ctrl.update
);
router.delete('/:id', isAuthenticated, ctrl.remove);

module.exports = router;
