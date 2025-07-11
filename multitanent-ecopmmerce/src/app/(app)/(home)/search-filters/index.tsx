
import { Categories } from "./categories"
import { SearchInput } from "./search-input"


export const SearchFilters = ({data}:{data:any}) => {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-12 py-8 w-full border-b">
      <SearchInput />
      <Categories data={data} />
        
      
      </div>
  )
}
