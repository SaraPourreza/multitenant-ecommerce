import z from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { Category } from "@/payload-types";



export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
  .input(
    z.object({
         category: z.string().nullable().optional(),
         minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    
  ).query(async ({ctx,input})=>{
const where: Where = {} ;
if(input.minPrice){
  where.price={
    greater_than_equal:input.minPrice
  }

}
if(input.maxPrice){
  where.price={
    less_than_equal:input.maxPrice
  }

}
 if (input.category) {

      const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          depth:1,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

console.log(categoriesData)
                const formattedData = categoriesData.docs.map((doc) => ({
                  ...doc,
                  subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                    //beacause of depth=1 we are confident doc will be a type of category
                    ...(doc as Category),
                    subcategories:undefined,
                  })),
                }));

        const subcategoriesSlugs= [];  
        const parentCategory = formattedData[0];

        if (parentCategory){
     subcategoriesSlugs.push(
        ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
      )
       where["category.slug"]={
            in:[parentCategory.slug,...subcategoriesSlugs]
                // equals:category.slug
          }
        }
        
   
}

  const data = await ctx.db.find({
          collection: "products",
          depth: 2,//populate subcategories,subcategories.[0] will be a type of category
        where,
        });
         return data
  })
});


 
// export const productsRouter = createTRPCRouter({
//   getMany: baseProcedure
//   .input(
//     z.object({
//          category: z.string().nullable().optional(),
//       })
    
//   ).query(async ({ctx,input})=>{
// const where: Where = {} ;

//  if (input.category) {

//       // const categoriesData = ctx.db.find({
//         //   collection: "categories",
//         //   limit: 1,
//         //   pagination: false,
//         //   where: {
//         //     slug: {
//         //       equals: input.category,
//         //     },
//         //   },
//         // });
//         // const category = (await categoriesData).docs[0];
//         // if (category){
//         //   where["category.slug"]={
//         //     equals:input.category
//         //         // equals:category.slug
//         //   }
//         // }
// where["category.slug"]={
  
//      equals:input.category,
//   }
// }

//   const data = await ctx.db.find({
//           collection: "products",
//           depth: 2,//populate subcategories,subcategories.[0] will be a type of category
//         where,
//         });
//          return data
//   })
// });

     
      
     

