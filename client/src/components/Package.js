import React, { useRef, useState, useEffect} from "react";
import './Package.css';
import {Modal, Button, Carousel} from 'react-bootstrap';

function Package( {pkg} ) {
    const [show, setShow] = useState(false);
    const focusRef = useRef(null);

    const handleClose = () => {
        console.log("Modal Closed");
        setShow(false);
    };
    const handleShow = () => {
        console.log("Modal Opened");
        setShow(true);
    }

    useEffect(() => {
        if (!show) {
            focusRef.current?.focus();
        }
    }, [show]);

    
    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={pkg.imageurls[0]} className='smallimg' alt="packageimages" />
            </div>
            <div className='col-md-7'>
                <h1>{pkg.name}</h1>
                <b>
                    <p>Rate : Rs.{pkg.rate}/= per hour</p>
                    <p>{pkg.description}</p>
                    <p>Type : {pkg.type}</p>
                </b>
                <div style={{float: 'right'}}>
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{pkg.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {pkg.imageurls.map((url) => {
                            return (
                                <Carousel.Item key={url}>
                                    <img className="d-block w-100 bigimg" src={url} alt="First Slide"/>
                                </Carousel.Item> 
                            )
                        })}                       
                    </Carousel>
                    <p><b>{pkg.description}</b></p>
                    <ul>
                        <li><b>Rate : </b>Rs.{pkg.rate}/= per hour</li>
                        <li><b>Includes : </b>{pkg.includes}</li>
                        <li><b>Additional Features : </b>{pkg.features}</li>
                        <li><b>Booking Requirements : </b>{pkg.requirements}</li>
                        <li><b>Type : </b>{pkg.type}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div tabIndex={-1} ref={focusRef}></div>
        </div>
    )
}

export default Package
