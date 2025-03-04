import { useState,useEffect} from "react";
import axios from 'axios';
const useAxiosFetch=(dataUrl)=>{
    const [data,setData]=useState([]);
    const [fetchError,setFetchError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
   
    useEffect(()=>{
        let isMounted =true;
        // const source=axios.CancelToken.source();
        const controller = new AbortController();
        const signal=controller.signal;

        const fetchData=async ()=>{
            setIsLoading(true);
            try{
                const response= await axios.get(dataUrl,{signal});
                if (isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if (isMounted){
                    setFetchError(
                        err.response
                            ? `Error:${err.response.status} - ${err.response.statusText}`
                            : "Network Error"
                    );
                    setData([]);
                }
            }finally{
                isMounted && setIsLoading(false);
            }
        }
        fetchData();
        //cleanup function
        return ()=>{
            isMounted=false;
            controller.abort();
        }
    },[dataUrl]);
    return {data, fetchError, isLoading};
}
export default useAxiosFetch;