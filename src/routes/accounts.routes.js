const router = require('express').Router();
const ctrl = require('../controllers/accounts.controller');
const validate = require('../validation/validate');
const { AccountSchema } = require('../validation/accounts.schema');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', validate(AccountSchema), ctrl.create);
router.put('/:id', validate(AccountSchema.partial()), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
