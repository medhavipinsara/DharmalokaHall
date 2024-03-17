import React , {useState} from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{marginTop:'200px'}}>
            <div className="sweet-loading text-center">
                <PropagateLoader
                    color='#000'
                    loading={loading}
                    cssOverride=''
                    size={20}
                /  >
            </div>  
        </div>
    )
}

export default Loader
