import React, { useState } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const Header = (props) => {

    const[modalIsOpen, setModalIsOpen] = useState(false);
    
    const[value, setValue]=  useState(0);
    
    const[usernameRequired, setUsernameRequired] =useState("dispNone");
    const[username, setUsername]= useState("");
    const[loginPasswordRequired, setLoginPasswordRequired] =useState("dispNone");
    const[loginPassword, setLoginPassword]= useState("");

    const[firstnameRequired, setFirstnameRequired] = useState("dispNone");
    const[firstname, setFirstname]=useState( "");
    const[lastnameRequired, setLastnameRequired]=useState( "dispNone");
    const[lastname, setLastname]=useState("");
    const[emailRequired, setEmailRequired]=useState( "dispNone");
    const[email, setEmail]=useState( "");
    const[registerPasswordRequired, setRegisterPasswordRequired]=useState( "dispNone");
    const[registerPassword, setRegisterPassword]=useState( "");
    const[contactRequired, setContactRequired]=useState( "dispNone");
    const[contact, setContact]=useState("");
    const[registrationSuccess, setRegistrationSuccess]=useState( false);

    const [loggedIn, setLoggedIn] =  useState(sessionStorage.getItem("access-token") == null ? false : true)

    const tabChangeHandler = (event, value) => {
        setValue(value);
    }

    const logoutHandler = () => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        setLoggedIn(false);
    }

    const closeModalHandler = () => {
        setModalIsOpen(false);
    }

    const inputUsernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const inputLoginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }

    const inputFirstNameChangeHandler = (e) => {
        setFirstname(e.target.value);
    }

    const inputLastNameChangeHandler = (e) => {
        setLastname(e.target.value);
    }

    const inputEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const inputRegisterPasswordChangeHandler = (e) => {
        setRegisterPassword(e.target.value);
    }

    const inputContactChangeHandler = (e) => {
        setContact(e.target.value);
    }

    const loginClickHandler = () => {
        username === "" ? setUsernameRequired("dispBlock") : setUsernameRequired("dispNone");
        loginPassword === "" ? setLoginPasswordRequired("dispBlock") : setLoginPasswordRequired("dispNone");

        let dataLogin = null
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                setLoggedIn(true);
                closeModalHandler();
            }
        });
        xhrLogin.open("POST", props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    const registerClickHandler = () => {
        firstname === "" ? setFirstnameRequired("dispBlock") : setFirstnameRequired("dispNone");
        lastname === "" ? setLastnameRequired("dispBlock") : setLastnameRequired("dispNone");
        email === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone");
        registerPassword === "" ? setRegisterPasswordRequired("dispBlock") : setRegisterPasswordRequired("dispNone");
        contact === "" ? setContactRequired("dispBlock") : setContactRequired("dispNone");

        let dataSignup = JSON.stringify({
            "first_name": firstname,
            "last_name": lastname,
            "email_address": email,
            "password": registerPassword,
            "mobile_number": contact
        });

        let xhrSignup = new XMLHttpRequest();
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                setRegistrationSuccess(true);
            }
        });

        xhrSignup.open("POST", props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    const openModalHandler = () => {
        setModalIsOpen(true);
        setValue(0);
        setUsernameRequired("dispNone");
        setUsername("");
        setLoginPasswordRequired("dispNone");
        setLoginPassword("");
        setFirstnameRequired("dispNone");
        setFirstname("");
        setLastnameRequired("dispNone");
        setLastname("");
        setEmailRequired("dispNone");
        setEmail("");
        setRegisterPasswordRequired("dispNone");
        setRegisterPassword("");
        setContactRequired("dispNone");
        setContact("");
    }

    return (
        <div>
            <header className="app-header">
                <img src={logo} className="app-logo" alt="Logo" />
                {loggedIn ?
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </div>
                    :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={openModalHandler}>
                            Login
                        </Button>
                    </div>
                }
                
                {props.showBookShowButton === "true" && !loggedIn ?
                    <div className="bookshow-button">
                        <Button variant="contained" color="primary" onClick={openModalHandler}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {props.showBookShowButton === "true" && loggedIn ? 
                    <div className="bookshow-button">
                        <Link to={"/bookshow/" + props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }
            </header>

            <Modal ariaHideApp={false}
                    isOpen={modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={closeModalHandler}
                    style={customStyles}>

                <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {value === 0 &&
                    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                        <FormControl required>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={username} onChange={inputUsernameChangeHandler} />
                            <FormHelperText className={usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" loginpassword={loginPassword} onChange={inputLoginPasswordChangeHandler} />
                            <FormHelperText className={loginPasswordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <Button variant="contained" color="primary" onClick={loginClickHandler}>LOGIN</Button>
                    </Typography>
                }
                {value === 1 && 
                   <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" onChange={inputFirstNameChangeHandler} />
                            <FormHelperText className={firstnameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" onChange={inputLastNameChangeHandler} />
                            <FormHelperText className={lastnameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="email" onChange={inputEmailChangeHandler} />
                            <FormHelperText className={emailRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required aria-describedby="name-helper-text">
                            <InputLabel htmlFor="passwordReg">Password</InputLabel>
                            <Input type="password" id="passwordReg" onChange={inputRegisterPasswordChangeHandler} />
                            <FormHelperText className={registerPasswordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="mobile">Contact No</InputLabel>
                            <Input id="mobile" onChange={inputContactChangeHandler} />
                            <FormHelperText className={contactRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        {registrationSuccess === true &&
                            <FormControl>
                                <span className="successText"> Registration Successful. Please Login!</span>
                            </FormControl>}<br /><br />
                        <Button variant="contained" color="primary" onClick={registerClickHandler}>
                            REGISTER
                        </Button>
                    </Typography>}
            </Modal>
        </div>
    );
}
export default Header;
