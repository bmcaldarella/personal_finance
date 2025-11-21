// src/routes/accounts.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/accounts.controller');
const validate = require('../validation/validate');
const { AccountSchema } = require('../validation/accounts.schema');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

router.post('/', isAuthenticated, validate(AccountSchema), ctrl.create);
router.put(
  '/:id',
  isAuthenticated,
  validate(AccountSchema.partial()),
  ctrl.update
);
router.delete('/:id', isAuthenticated, ctrl.remove);

module.exports = router;
