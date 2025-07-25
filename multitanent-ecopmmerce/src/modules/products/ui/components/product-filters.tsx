'use client'

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronsRightIcon } from "lucide-react";
import { useState } from "react"
import { PriceFilter } from "./price-filter";
import { useProductsFilters } from "../../hooks/use-products-filters";

interface ProductFilterProps {
    title:string,
    className?:string,
    children:React.ReactNode
}
const ProductFilter = ({title,className,children}: ProductFilterProps)=>{

    const [isOpen,setIsOpen]=useState(false);
    const Icon= isOpen? ChevronDownIcon : ChevronsRightIcon
    return (
        <div className={cn(
            "p-4 border-b flex flex-col gap-2",
            className
        )}>

            <div 
            onClick={() => setIsOpen((current)=>!current)}
            className="flex items-center justify-between cursor-pointer"
            >
<p className="font-medium">{title}</p>
<Icon className="size-5"/>

            </div>
            {isOpen && children}
        </div>
    )
}

const ProductFilters = () => {
const [filters,setFilters] = useProductsFilters()
const onChange = (key:keyof typeof filters,value:unknown)=>{
    setFilters({...filters,[key]:value})
}
  return (
    <div className="border rounded-md bg-white">
        <div className="flex items-center justify-between border-b p-4">
<p className="font-medium">Filters</p>
<button className="underline" type="button" onClick={()=>{}}>
    clear
</button>
        </div>
        <ProductFilter title="price" className="border-b-0">
<PriceFilter
minPrice={filters.minPrice}
maxPrice={filters.maxPrice}
onMinPriceChange={(value) => onChange("minPrice",value)}
onMaxPriceChange={(value) => onChange("maxPrice",value)}
/>
        </ProductFilter>
      
    </div>
  )
}

export default ProductFilters
