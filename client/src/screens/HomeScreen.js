import React, { useEffect } from 'react';
import axios from 'axios';

function HomeScreen() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/halls/getallhalls', {
                    // Set the base URL to the backend server address
                    baseURL: 'http://localhost:5000' // Update this with your backend server address
                });
                const data = response.data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home Screen</h1>
        </div>
    );
}

export default HomeScreen;
