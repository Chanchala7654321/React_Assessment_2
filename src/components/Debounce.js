
import { useState, useEffect } from "react";


function useDebounce(value, delay) {
    const [debounceVal, setDebounceVal] = useState(value);

    useEffect(() => {
        const timeId = setTimeout(()=> {
            setDebounceVal(value)
        }, delay)

        return ()=>{
            clearTimeout(timeId)
        }

    },[value, delay])

    return debounceVal;

}

export default useDebounce



