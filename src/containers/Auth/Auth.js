﻿import {React, useState} from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';

const Auth = () => {
    const [state, setState] = useState({
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    });

    const loginHandler = () => {

    };
    const registerHandler = () => {

    };
    const submitHandler = (event) => {
        event.preventDefault();
    };

    const validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    };

    const onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value);

        const formControls = {...state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[controlName] = control;

        setState({
            formControls
        });
    };

    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            );
        });
    };

    return (
        <div className={classes['Auth']}>
            <div>
                <h1>Авторизация</h1>

                <form onSubmit={submitHandler} className={classes['AuthForm']}>

                    {renderInputs()}

                    <Button type="success" onClick={loginHandler}>
                        Войти
                    </Button>

                    <Button type="primary" onClick={registerHandler}>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Auth;