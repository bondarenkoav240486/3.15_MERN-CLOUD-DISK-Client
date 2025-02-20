import React, { useState } from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from "../../config";

// Імпортуємо іконку хмари з Material-UI
// import CloudIcon from '@material-ui/icons/Cloud';
import CloudIcon from '@material-ui/icons/FilterDrama';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                {/* <img src={Logo} alt="" className="navbar__logo"/> */}
                {/* Використовуємо іконку хмари */}
                <CloudIcon className="navbar__logo"
                // style={{ fontSize: '3.3rem' }}
                />
                <div className="navbar__header">Mern Cloud Disk</div>
                {/* <div className='wrapper'> */}
                    {isAuth && <input
                        value={searchName}
                        onChange={e => searchChangeHandler(e)}
                        className='navbar__search'
                        type="text"
                        placeholder="Назва файлy..." />}
                    {!isAuth && <div className="navbar__login isauth_false"><NavLink to="/login">Вхід</NavLink></div>}
                    {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регістрація</NavLink></div>}
                    {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Вихід</div>}
                    {isAuth && <NavLink to='/profile'>
                        <img className="navbar__avatar" src={avatar} alt="" />
                    </NavLink>}
                {/* </div> */}
            </div>
        </div>
    );
};

export default Navbar;
