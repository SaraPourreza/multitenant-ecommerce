import { Category } from "@/payload-types";
import { CategoryDropdown } from "./categort-dropdown";

interface Props {
  data: any;
}

export const Categories = ({ data }: Props) => {
  console.log(data);
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
