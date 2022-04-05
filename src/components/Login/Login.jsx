import React, { useEffect, useState } from 'react';
import Http from "../../Helpers/Http";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { SelectButton } from 'primereact/selectbutton';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { classNames } from 'primereact/utils';
import './Login.css';
import Cabecera from '../Cabecera/Cabecera';
import { render } from '@testing-library/react';
import FormularioRegistro from '../FormularioRegistro/FormularioRegistro';


const Login = ({ authorized, setAuthorized }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [tipoUsuario, setTipoUsuario] = useState(true);
    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const [displayRegister, setDisplayRegister] = useState(false);

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    const checkLogin = async () => {
        let body = {
            "usuario": username,
            "password": password,
        };
        const result = await Http.post(body, "/api/usuarios/login");
        //console.log("Respuesta: ", result);
        if (result) {
            console.log("Login OK");
            document.cookie = "username=" + username;
            document.cookie = "_id=" + result;
            document.cookie = "profile=user";
            setAuthorized(true);
        }
        else {
            const result2 = await Http.post(body, "/api/impresores/login");
            if (result2) {
                console.log("Login OK");
                document.cookie = "username=" + username;
                document.cookie = "_id=" + result;
                document.cookie = "profile=printer";
                setAuthorized(true);
            } else alert("login failed");
        };


    }


    useEffect(() => {
        console.log("TipoUsuario: ", tipoUsuario);
    }, [authorized, tipoUsuario]);

    return (
        <>
            <Cabecera />
            <div style={{ display: 'grid', gridAutoFlow: 'column', alignItems: 'center', justifyItems: 'center', height: '70vh' }}>

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
                                            <label htmlFor="usuario" className={classNames({ 'p-error': errors.name })}>Nombre de usuario</label>
                                        </span>
                                        {getFormErrorMessage('name')}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="Contraseña" toggleMask />
                                        </span>
                                        {getFormErrorMessage('password')}
                                    </div>
                                    <p>Tipo de usuario:</p> 
                                    <ToggleButton checked={tipoUsuario}  onChange={(e) => setTipoUsuario(!tipoUsuario)} onLabel="Usuario" offLabel="Impresor" style={{width: '10em'}} />
                                    <br/> <br/>
                                    <Button label="Login" className="mt-2" onClick={() => checkLogin()} />
                                    <p>¿No tienes cuenta? </p> <Button label="Regístrate" className="mt-2" style={{ width: '12%', height: "9%" }} onClick={() => setDisplayRegister(true)} />
                                    <Dialog visible={displayRegister} onHide={() => setDisplayRegister(false)}>
                                        <FormularioRegistro setDisplayRegister={setDisplayRegister} />
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Login;