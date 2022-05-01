import React, { useEffect, useState, useRef } from 'react';
import Http from "../../Helpers/Http";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './FormularioRegistro.css';


const FormularioRegistro = ({ setDisplayRegister }) => {
    const [toggleUser, setToggleUser] = useState(false);
    const [valoresImpresor, setValoresImpresor] = useState({
        impresoras: 1,
        tamanyo: 1,
        precio: 1
    })
    const defaultValues = {
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono: '',
        email: '',
        direccion: '',
        perfil: '',
        usuario: '',
        precio: null,
        tamanyo: null,
        impresoras: null,
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono: '',
        email: '',
        direccion: '',
        perfil: '',
        usuario: '',
        password: '',
        precio: null,
        tamanyo: null,
        impresoras: null,
        accept: false
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        let checkUsername;
        if (toggleUser) {
            data.impresoras = valoresImpresor.impresoras;
            data.tamanyo = valoresImpresor.tamanyo;
            data.precio = valoresImpresor.precio;
            data.perfil = "impresor";
        }
        else data.perfil = "usuario";

        checkUsername=await Http.get(`/api/usuarios/checkUsername=${data.usuario}`);
        console.log("check username:", checkUsername);
        if (checkUsername) alert("El nombre de usuario ya existe");
        else {
            //console.log(data);
            const ins = await Http.post(data, "/api/usuarios/");
            confirmDialog({
                message: 'Usuario creado con éxito, ya puedes iniciar sesión',
                header: 'Usuario creado correctamente',
                icon: 'pi pi-check-circle',
                footer: <></>
            });
            reset();
            setDisplayRegister(false);
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const passwordHeader = <h6>Elige una contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 carácteres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <Card title="Formulario de registro" style={{ width: '55rem', marginBottom: '0em' }}>
            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="nombre" control={control} rules={{ required: 'Debes introducir un nombre' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombre')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="apellido1" control={control} rules={{ required: 'Debes introducir un apellido.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.apellido1} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="apellido1" className={classNames({ 'p-error': errors.name })}>Primer Apellido*</label>
                                </span>
                                {getFormErrorMessage('apellido1')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="apellido2" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="apellido2" className={classNames({ 'p-error': errors.name })}>Segundo Apellido</label>
                                </span>
                                {getFormErrorMessage('apellido2')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="telefono" control={control} render={({ field, fieldState }) => (
                                        <InputMask id={field.name} {...field} mask="999999999" className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="telefono" className={classNames({ 'p-error': errors.name })}>Teléfono</label>
                                </span>
                                {getFormErrorMessage('telefono')}
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <Controller name="email" control={control}
                                        rules={{ required: 'Debes introducir una dirección de correo electrónico.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Introduce una dirección válida. Ej. example@email.com' } }}
                                        render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="direccion" control={control} rules={{ required: 'Debes introducir la dirección.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.direccion} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="direccion" className={classNames({ 'p-error': errors.name })}>Dirección*</label>
                                </span>
                                {getFormErrorMessage('direccion')}
                            </div>
                            <Divider align="center">
                                <ToggleButton checked={toggleUser} onChange={(e) => setToggleUser(!toggleUser)} onLabel="Usuario impresor" offLabel="Usuario normal" style={{ width: '10em', backgroundColor: '#883cae' }} />
                            </Divider><br />
                            {
                                toggleUser ? (
                                    <>
                                        <div className="field" style={{ alignItems: 'center', marginLeft: '35%' }}>
                                            <span className="p-float-label">
                                                Nº de impresoras

                                                <InputNumber inputId="horizontal"

                                                    style={{ width: '30%', marginLeft: '5.2%' }}
                                                    onValueChange={(e) => setValoresImpresor({ ...valoresImpresor, tamanyo: e.value })}
                                                    showButtons
                                                    buttonLayout="horizontal"
                                                    step={1}
                                                    min={0} max={100}
                                                    value={1}
                                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />


                                            </span>

                                        </div>
                                        <div className="field">
                                            <span className="p-float-label" style={{ marginLeft: '35%' }}>
                                                Tamaño máximo

                                                <InputNumber inputId="horizontal"
                                                    style={{ width: '30%', marginLeft: '6.6%' }}
                                                    onValueChange={(e) => setValoresImpresor({ ...valoresImpresor, tamanyo: e.value })}
                                                    showButtons
                                                    buttonLayout="horizontal"
                                                    step={0.5}
                                                    value={1}
                                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" suffix=" cm" />

                                            </span>

                                        </div>
                                        <div className="field">
                                            <span className="p-float-label" style={{ marginLeft: '35%' }}>
                                                Precio por modelo

                                                <InputNumber inputId="horizontal"
                                                    style={{ width: '30%', marginLeft: '3.8%' }}
                                                    onValueChange={(e) => setValoresImpresor({ ...valoresImpresor, precio: e.value })}
                                                    showButtons
                                                    buttonLayout="horizontal"
                                                    step={1}
                                                    value={1}
                                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="currency" currency="EUR" />

                                            </span>
                                        </div>
                                    </>
                                ) : ""
                            }
                            <br />
                            <div className="field">
                                <h5>Nombre de usuario*:</h5>
                                <span className="p-float-label">
                                    <Controller name="usuario" control={control} rules={{ required: 'Debes introducir un nombre de usuario.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.usuario} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="usuario" className={classNames({ 'p-error': errors.name })}></label>
                                </span>
                                {getFormErrorMessage('usuario')}
                            </div>

                            <div className="field">
                                <h5>Contraseña*:</h5>
                                <span className="p-float-label">
                                    <Controller name="password" control={control} rules={{ required: 'Debes introducir una contraseña.' }} render={({ field, fieldState }) => (
                                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.name })}></label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>

                            <div className="field-checkbox">
                                <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                    <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}> Acepto los términos y condiciones*</label>
                            </div>&nbsp;
                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </Card>
    );
}
export default FormularioRegistro;