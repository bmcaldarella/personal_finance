const { z } = require('zod');
const AccountSchema = z.object({
  name: z.string().min(2),
  balance: z.number().nonnegative(),
  currency: z.string().min(3) 
});
module.exports = { AccountSchema };
