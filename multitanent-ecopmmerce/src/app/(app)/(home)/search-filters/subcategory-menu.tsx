import { Category } from "@/payload-types";
import Link from "next/link";
import { CustomCategory } from "../types";

interface Props {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubCategoryMenu = ({ category, isOpen, position }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }
  const backgroundColor = category.color || "#f5f5f5";
  return(
  <div
    className="fixed z-100 "
    style={{ top: position.top, left: position.left }}
  >
    {/* invisible brifge to maintain hover */}
    <div className="h-3 w-60" />
      <div 
      style={{backgroundColor}}
      className="w-60 text-black rounded-md overflow-hidden border shadow-[4px-4px-0px-0ox-rgba(0.0.0.1)] -translate-x-[2px] -translate-y-[2px]">
      <div>
        {category.subcategories?.map((subcategory: Category)=>(
            <Link
             key={subcategory.slug}
             href={`/${category.slug}/${subcategory.slug}`}
             className="w-full p-4 text-left hover:bg-black hover:text-white flex justify-between items-center underline font-medium "
             >
                {subcategory.name}
              
            </Link>
        ))}
      
      </div>
      </div>
   
  </div>
)};
