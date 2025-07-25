import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";


import { TRPCError } from "@trpc/server";

import { AUTH_COOKIE } from "../constant";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookies } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    console.log({session})
    return session;
  }),
  logout : baseProcedure.mutation(async () =>{
    const cookies= await getCookies()
    cookies.delete(AUTH_COOKIE)
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit:1,
        where:{
          username:{
            equals:input.username
          }
        }
      })
      const existingUser= existingData.docs[0]
      if (existingUser){
        throw new TRPCError({
          code:"BAD_REQUEST",
          message:"Username already taken"
        })
      }
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, //this will be hashed by tRpc
        },
      });
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email:input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
         code:"UNAUTHORIZED",
          message: "failed to login",
        });
      }

           await generateAuthCookies({
      prefix: ctx.db.config.cookiePrefix,
      value:data.token
    })
      // const cookies= await getCookies()
      // cookies.set({
      //   name:AUTH_COOKIE,
      //   value:data.token,
      //   httpOnly:true,
      //   path:"/",
      //   // sameSite:"",
      //   // domain:"",
      // })
    }),



  login: baseProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email:input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
         code:"UNAUTHORIZED",
          message: "failed to login",
        });
      }
     await generateAuthCookies({
      prefix: ctx.db.config.cookiePrefix,
      value:data.token
    })
      return data
    }),
});
