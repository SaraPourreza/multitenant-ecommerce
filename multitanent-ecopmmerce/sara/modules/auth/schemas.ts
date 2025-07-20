import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(63, "username must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "username can  only contain lowecase letters,numbers and hyphones.it must start and end with a letter or number"
    )
    .refine(
      (val) => !val.includes("__") // this would be the domain [username].shop.com .. it hase to be one word
    )
    .transform((val) => val.toLowerCase()),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
