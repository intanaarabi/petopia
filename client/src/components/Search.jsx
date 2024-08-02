import { MdOutlineSearch } from "react-icons/md";

const Search = () => {
    return(
    <div className="relative w-[500px]">
        <MdOutlineSearch className="absolute top-[9px] ml-3" />
        <input type="search" name="search" placeholder="Search" className="bg-white pl-10 w-full h-8 px-5  rounded-full text-xs focus:outline-none"/>
    </div>
    )
}


export default Search
