// dependencies
import React, { useState, useContext } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";
import { API } from '../config/api';
import { Link, useNavigate } from "react-router-dom"


const primaryColor = "#C32424"
export default function ModalLoginRegister({ show, setShow }) {
    // modal-check
    const handleShowLogin = () => setShow(true);
    const handleCloseLogin = () => setShow(false);
    const [shows, setShows] = useState(false);
    const handleShowRegister = () => setShows(true);
    const handleCloseRegister = () => setShows(false);
    const navigate = useNavigate()

    const handleSwitchRegister = () => {
        setShow(false);
        setShows(true);
    };

    const handleSwitchLogin = () => {
        setShows(false);
        setShow(true);
    };


    const [state, dispatch] = useContext(UserContext);
    // -----------------LOGIN---------------------------
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    //
    const handleChangeLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };
    const [loading, setLoading] = useState(false)
    const handleSubmitLogin = useMutation(async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(login);

            const response = await API.post("/login", body, config);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
            });
            console.log(state)
            console.log(response.data.data)
            setShow(false);
            navigate(0)
        } catch (error) {
            <Alert variant="danger" className="py-1">
                Login Failed
            </Alert>
            console.log(error);
        }
    });
    //---------------------------------------------------

    // -----------------REGISTER--------------------------
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });


    const handleSubmitRegister = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // Data body
            const body = JSON.stringify(register);

            // Insert data user to database
            const response = await API.post("/register", body, config);
            console.log("signup success", response.data.data)
            // Handling response here
            setShows(false);
            setShow(true);
        }
        catch (error) {
            <Alert variant="danger" className="py-1">
                Sign up Failed
            </Alert>
            console.log(alert);
        }

    });
    //-----------------------------------------------------
    return (
        <>
            <Button onClick={handleShowLogin} variant="" className="me-3 fw-bold" style={{ color: "white" }}>
                Login
            </Button>
            <Modal show={show} onHide={handleCloseLogin} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body>
                    <Modal.Title className='text-danger fw-bold'>Login</Modal.Title>
                </Modal.Body>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleChangeLogin}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChangeLogin}
                            />
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button variant="danger" onClick={(e) => handleSubmitLogin.mutate(e)}>
                                {loading ?
                                    (<Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />) :
                                    ("Login")}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Body>
                    <Form.Label
                        className='mx-0'>Don't have an account? Click <Link
                            style={{ textDecoration: "none" }}
                            className='fw-bold text-dark'
                            onClick={handleSwitchRegister}
                        >
                            Here
                        </Link>
                    </Form.Label>
                </Modal.Body>
            </Modal>

            <Button variant="light" onClick={handleShowRegister} className="fw-bold" style={{ color: primaryColor }}>
                Register
            </Button>
            <Modal show={shows} onHide={handleCloseRegister} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body>
                    <Modal.Title className='fw-bold text-danger'>Register</Modal.Title>
                </Modal.Body>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) => setRegister({ ...register, name: e.target.value })}
                                value={register.name}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={register.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={register.password}
                            />
                        </Form.Group>
                        <div className='d-grid gap-2 mt-5'>
                            <Button variant="danger" type="submit" onClick={(e) => handleSubmitRegister.mutate(e)}>Register</Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Body>
                    <Form.Label className='text-center'>Already have an account? Click <Link
                        style={{ textDecoration: "none" }}
                        className='fw-bold text-dark'
                        onClick={handleSwitchLogin}
                    >
                        Here
                    </Link>
                    </Form.Label>
                </Modal.Body>
            </Modal>

        </>
    )

}
