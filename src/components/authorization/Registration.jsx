import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";

// import {registration} from "../../actions/user";
import { registration, login } from "../../actions/user";
import {useDispatch} from "react-redux";


const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const handleRegistration = () => {
        registration(email, password)
            .then(() => {
                // After successful registration, dispatch the login action
                // login(email, password);
                dispatch(login(email, password))
            });
    };

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            {/* <button className="authorization__btn" onClick={() => registration(email, password)}>Зарегистрироваться</button> */}
            <button className="authorization__btn" onClick={handleRegistration}>Зарегистрироваться</button>

        </div>
    );
};

export default Registration;
