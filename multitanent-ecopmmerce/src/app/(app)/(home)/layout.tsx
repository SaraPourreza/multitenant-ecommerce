import { Category } from "@/payload-types";
import { Footer } from "./footer";
import Navbar from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,//populate subcategories,subcategories.[0] will be a type of category
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort:"name"
  });
  const formattedData:CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      //beacause of depth=1 we are confident doc will be a type of category
      ...(doc as Category),
      subcategories:undefined,
    })),
  }));
 
//  const formattedData = data.docs.map((doc) => {
//     const subcategories = Array.isArray(doc.subcategories) 
//       ? doc.subcategories // Already an array
//       : doc.subcategories?.docs || []; // Paginated response

//     return {
//       ...doc,
//       subcategories: subcategories.map((subcat) => ({
//         ...(subcat as Category),
//         subcategories: undefined,
//       })),
//     };
//   });
  console.log({data,formattedData});
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
