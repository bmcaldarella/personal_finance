const { z } = require('zod');
const TransactionSchema = z.object({
  type: z.enum(['income', 'expense', 'saving', 'bill']),
  amount: z.number().positive(),
  category: z.string().min(2),
  description: z.string().optional(),
  date: z.coerce.date(),
  paymentMethod: z.enum(['cash', 'card', 'transfer']),
});
module.exports = { TransactionSchema };
