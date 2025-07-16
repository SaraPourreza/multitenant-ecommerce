
'use client'
import { useTRPC } from "@/trpc/client"

import { Categories } from "./categories"
import { SearchInput } from "./search-input"
import { useSuspenseQuery } from "@tanstack/react-query"


export const SearchFilters = () => {

    const trpc = useTRPC();
    const { data }=useSuspenseQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-12 py-8 w-full border-b"
    style={{backgroundColor: "#f5f5f5"}}
    >
      <SearchInput/>
     <div className="hidden lg:block">
       <Categories data={data} />
     </div>
        
      
      </div>
  )
}
export const SearchFilteresSkeleton = () => {
  return (
     <div className="flex flex-col gap-4 px-4 lg:px-12 py-8 w-full border-b"
     style={{backgroundColor: "#f5f5f5"}}
     >
      <SearchInput disabled/>
     <div className="hidden lg:block">
       <div className="h-11"/>
     </div>
        
      
      </div>
  )

}
