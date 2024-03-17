import React, { useState, useEffect } from "react";
import axios from "axios";
import Package from "../components/Package";

function PackagesScreen() {
    const [packages, setpackages] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const response = await axios.get("/api/packages/getallpackages", {
                    baseURL: "http://localhost:5000",
                });
                const data = response.data;
                setpackages(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
    }, []);


    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Error</h1>
                ) : (
                    packages.map((pkg) => {
                        return(
                            <div key={pkg._id} className="col-md-9 mt-2">
                                <Package pkg={pkg} /> 
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default PackagesScreen;