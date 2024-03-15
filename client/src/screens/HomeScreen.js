import React, { useState, useEffect } from "react";
import axios from "axios";
import Hall from "../components/Hall";

function HomeScreen() {
    const [halls, setHalls] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const response = await axios.get("/api/halls/getallhalls", {
                    baseURL: "http://localhost:5000",
                });
                const data = response.data;
                setHalls(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
    }, []);

    //The above code works fine. The below code done by sam didn't work. Couldn't find the error.
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/api/halls/getallhalls', {
    //                 // Set the base URL to the backend server address
    //                 baseURL: 'http://localhost:5000', // Update this with your backend server address
    //             });
    //             const data = response.data;
    //             console.log(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <div className="row">
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Error</h1>
                ) : (
                    halls.map((hall) => {
                        return(
                            <div key={hall._id} className="col-md-9">
                                <Hall hall={hall} />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default HomeScreen;
