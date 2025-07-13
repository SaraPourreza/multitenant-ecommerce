"use client";
import { CategoryDropdown } from "./categort-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
  data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHoverd] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return null;
      const containerWidth = containerRef.current.offsetWidth;
      const vieAllWidth = viewAllRef.current.offsetWidth;
      const availbleWidth = containerWidth - vieAllWidth;
      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;
      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availbleWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible)
    };
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!)
    return ()=>resizeObserver.disconnect()
  }, [data.length]);

  return (
    <div className="relative w-full">
{/* categories sidebar */}
<CategoriesSidebar open={isSideBarOpen}  onOpenChange={setIsSideBarOpen} data={data}/>

      {/* hdden dive to measure all items */}
      <div 
      ref={measureRef}
      className="absolute opacity-0 pointer-events-none flex"
      style={{position:"fixed", top:-9999 , left:-9999}}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* visible items */}
       <div 
       ref={containerRef}
       className="flex flex-nowrap items-center"
       onMouseEnter={()=> setIsAnyHoverd(true)}
     onMouseLeave={()=>setIsAnyHoverd(false)}
       >
        {data.slice(0,visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
      <Button
          variant="elevated"
          onClick={()=>setIsSideBarOpen(true)}
          className={cn(
            "h-11 bg-transparent px-4 border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary"
            
          )}
        >
        view All
        <ListFilterIcon className="ml-2" />
        </Button>
        </div>
      </div>
    </div>
  );
};
