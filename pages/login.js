import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form';
import { Link } from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {

        if(session?.user) router.push(redirect || '/');
        
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if(result.error)
                toast.error(result.error);            

        } catch(error) {
            toast.error(getError(error));
        }
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
                    <label htmlFor="password">Senha</label>
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
                    <button className='primary-button text-bold'>ACESSAR</button>
                </div>
                <div className='mb-4'>
                    Não tem uma conta? 
                   
                </div>
            </form>
        </Layout>
    )
}
