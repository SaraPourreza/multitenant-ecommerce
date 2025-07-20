interface Props{
    params: Promise<{
         category:string
        subcategory:string
        }>
}


const page = async ({params}:Props) => {
    const {category,subcategory} = await params;
  return (
    <div>page: {category}<br/>
    sub:{subcategory}
    </div>
  )
}

export default page
 