const router = require('express').Router();
const ctrl = require('../controllers/transactions.controller');

const validate = require('../validation/validate');
const { TransactionSchema } = require('../validation/transactions.schema');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

router.post('/', validate(TransactionSchema), ctrl.create);
router.put('/:id', validate(TransactionSchema.partial()), ctrl.update);

router.delete('/:id', ctrl.remove);

module.exports = router;
