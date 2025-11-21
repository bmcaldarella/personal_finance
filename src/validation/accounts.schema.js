const { z } = require('zod');

const AccountSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['checking', 'savings', 'credit', 'cash']),
  currency: z.string().min(3),
  initialBalance: z.number().nonnegative(),
  description: z.string().optional(),
});

module.exports = { AccountSchema };
