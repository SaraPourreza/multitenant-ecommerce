"use client";
import { useTRPC } from "@/trpc/client";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "../../../constants";
import BreadcrumbNavigation from "./breadcrumbs-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  console.log(`dataindex:${data}`)
  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";
  const activeCategoryData = data.find((cat) => cat.slug === activeCategory);
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
   const activeCategoryName = activeCategoryData?.name || null;

    const activeSubCategory = params.subcategory as string | undefined;
  const activeSubCategoryName =
  activeCategoryData?.subcategories?.find(
    (subcategory) => subcategory.slug === activeSubCategory
  )?.name || null;

  return (
    <div
      className="flex flex-col gap-4 px-4 lg:px-12 py-8 w-full border-b"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
   
       <BreadcrumbNavigation
       activeCategory={activeCategory}
       activeCategoryName={activeCategoryName}
       activeSubCategoryName={activeSubCategoryName}
       />
    </div>
   

  );
};
export const SearchFilteresSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 px-4 lg:px-12 py-8 w-full border-b"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
