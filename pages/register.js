import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

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
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password }) => {
        try {

            await axios.post('/api/auth/signup', {
                name,
                email, 
                password
            });

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
        <Layout title="Criar conta">
            <form className='mx-auto max-w-screen-md px-4' onSubmit={handleSubmit((submitHandler))}>
                <h1 className='mb-4 text-xl'>Criar conta</h1>
                <div className='mb-4'>
                    <label htmlFor="name">Nome</label>
                    <input type="text" 
                    {...register('name', {required: 'Por favor, digite seu nome'
                    })}
                    className='w-full' id="name" autoFocus />
                    {errors.name && 
                        (<div className='text-red-500'>{errors.name.message}</div>)
                    }
                </div>
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
                    className='w-full' id="password" />
                    {errors.password && 
                        (<div className='text-red-500'>{errors.password.message}</div>)
                    }
                </div>
                <div className='mb-4'>
                    <label htmlFor="confirmPassword">Confirme a senha</label>
                    <input type="password" 
                    {...register('confirmPassword', {
                        required: 'Por favor, confirme sua senha',
                        validate: (value) => value === getValues('password'),
                        minLength: { 
                            value: 6, message: 'Insira uma senha com mais de 5 caracteres'
                        }
                    })}
                    className='w-full' id="confirmPassword" />
                    {errors.confirmPassword && 
                        (<div className='text-red-500'>{errors.confirmPassword.message}</div>)
                    }
                    {errors.confirmPassword && 
                        errors.confirmPassword.type === 'validate' &&
                        (<div className='text-red-500'>As senhas estão diferentes</div>)
                    }
                </div>
                <div className='mb-4'>
                    <button className='primary-button text-bold'>Criar Conta</button>
                </div>
            </form>
        </Layout>
    )
}
