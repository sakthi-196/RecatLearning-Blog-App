import { createContext,useState,useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext=createContext({});
export const DataProvider=({ children })=>{
    const [posts,setPosts]=useState([]);
    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults]=useState([]);
    const {data,fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')
    //custom axios fetch
    useEffect(()=>{
        setPosts(data);
    },[data])
    //search post
    useEffect(()=>{
        const filteredResults=posts.filter(post =>
          ((post.body).toLowerCase()).includes(search.toLowerCase())
          || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filteredResults.reverse());
    },[posts,search])
    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults,fetchError,isLoading,
            posts, setPosts

        }}>
            {children}
        </DataContext.Provider>    
    )
}
DataProvider.defaultProps ={
    children : null,
};

export default DataContext;