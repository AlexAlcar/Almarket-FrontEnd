import React, { useEffect, useState } from 'react';
import Http from "../../Helpers/Http";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './Login.css';


const Login = ({ authorized, setAuthorized }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { control, formState: { errors }, handleSubmit, reset } = useForm();

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    const checkLogin = async () => {
        //Tengo que crear un endpoint que reciba user/pass y me devuelva true o false
        let body = {
            "usuario": username,
            "password": password,
        };
        const result = await Http.post(body, "/api/usuarios/login");
        console.log("Respuesta: ",result);
        if (result){
            console.log("Login OK");
            document.cookie = "username="+username;
            document.cookie = "_id="+result;
            setAuthorized(true);
        } 
        else console.log("Login NO OK");

    }

    useEffect(() => {
        
    }, [authorized]);

    return (
        <Card title="Iniciar Sesión" style={{ width: '55rem', marginBottom: '2em', textAlign: 'center' }}>

            <div className="form-demo">

                <div className="flex justify-content-center">
                    <div className="card">
                        <div className="p-fluid">

                            <div className="field" style={{ paddding: '5px' }}>
                                <span className="p-float-label">
                                    <Controller control={control} rules={{ required: 'Debes un nombre de usuario.' }} render={({ field, fieldState }) => (
                                        <InputText autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} onChange={(e) => setUsername(e.target.value)} />
                                    )} />
                                    <label htmlFor="usuario" className={classNames({ 'p-error': errors.name })}>Nombre de usuario*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Password onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <Button label="Login" className="mt-2" onClick={()=>checkLogin()} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Login;