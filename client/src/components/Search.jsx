import { MdOutlineSearch } from "react-icons/md";

const Search = ({ setSearchTerm }) => {
    return(
    <div className="relative w-[200] md:w-[500px]">
        <MdOutlineSearch className="absolute top-[9px] ml-3" />
        <input type="search" name="search" placeholder="Search"
         className="bg-white pl-10 w-full h-8 px-5  rounded-full text-xs focus:outline-none"
         onChange={(e) => setSearchTerm(e.target.value)}
         />
    </div>
    )
}


export default Search
