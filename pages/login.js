import React from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form';
import { Link } from 'next/link';

export default function LoginScreen() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = ({ email, password }) => {
        
    };

    return (
        <Layout title="Login">
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit((submitHandler))}>
                <h1 className='mb-4 text-xl'>Login</h1>
                <div className='mb-4'>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    {...register('email', {required: 'Por favor, digite seu email', pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: 'Por favor, insira um email válido'
                    }})}
                    className='w-full' id="email" autoFocus />
                    {errors.email && 
                        (<div className='text-red-500'>{errors.email.message}</div>)
                    }
                </div>
                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    {...register('password', {
                        required: 'Por favor, insira uma senha',
                        minLength: { value: 6, message: 'Insira uma senha com mais de 5 caracteres'}
                    })}
                    className='w-full' id="password" autoFocus />
                    {errors.password && 
                        (<div className='text-red-500'>{errors.password.message}</div>)
                    }
                </div>
                <div className='mb-4'>
                    <button className='primary-button'>Acessar</button>
                </div>
                <div className='mb-4'>
                    Não tem uma conta? 
                   
                </div>
            </form>
        </Layout>
    )
}
