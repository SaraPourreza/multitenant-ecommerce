
import { baseProcedure, createTRPCRouter } from "@/trpc/init";




export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}

      if (input.category) {
        // const categoriesData = ctx.db.find({
        //   collection: "categories",
        //   limit: 1,
        //   pagination: false,
        //   where: {
        //     slug: {
        //       equals: input.category,
        //     },
        //   },
        // });
        // const category = (await categoriesData).docs[0];
        // if (category){
        //   where["category.slug"]={
        //     equals:input.category
        //         // equals:category.slug
        //   }
        // }

          where["category.slug"]={
            equals:input.category
                // equals:category.slug
          }
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //populate  "category", "image"
        where,
      });

      return data;
    }),
});



export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
      
     const data = await ctx.db.find({
        collection:"products", 
        depth: 1, //populate  "category", "image"
      
      });

      return data;
    }),
});