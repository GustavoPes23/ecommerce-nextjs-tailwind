import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import { Store } from '../utils/Store';
import Layout from './../components/Layout';

export default function ShippingScreen() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const router = useRouter(); 

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('cep', shippingAddress.cep);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress]);

    const submitHandler = ({ fullName, address, city, cep, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, cep, country, location },
        });

        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    cep,
                    country,
                    location
                }
            })
        );

        router.push('/payment');
    }

    return (
        <Layout title="Endereço de entrega">
            <CheckoutWizard activeStep={1} />
            <form className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Endereço de entrega</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">Nome completo</label>
                    <input
                        className="w-full"
                        id="fullName"
                        autoFocus
                        {...register('fullName', {
                            required: 'Por favor, insira o nome completo'
                        })}
                    />
                    {
                        errors.fullName &&
                        (<div className="text-red-500">{errors.fullName.message}</div>)
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="address">Endereço</label>
                    <input
                        className="w-full"
                        id="address"
                        autoFocus
                        {...register('address', {
                            required: 'Por favor, insira seu endereço',
                            minLength: { value: 3, message: 'Insira mais que 2 caracteres' }
                        })}
                    />
                    {
                        errors.address &&
                        (<div className="text-red-500">{errors.address.message}</div>)
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="city">Cidade</label>
                    <input
                        className="w-full"
                        id="city"
                        autoFocus
                        {...register('city', {
                            required: 'Por favor, insira sua cidade',
                        })}
                    />
                    {
                        errors.city &&
                        (<div className="text-red-500">{errors.city.message}</div>)
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="cep">CEP</label>
                    <input
                        className="w-full"
                        id="cep"
                        autoFocus
                        {...register('cep', {
                            required: 'Por favor, insira seu CEP',
                        })}
                    />
                    {
                        errors.cep &&
                        (<div className="text-red-500">{errors.cep.message}</div>)
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="country">País</label>
                    <input
                        className="w-full"
                        id="country"
                        autoFocus
                        {...register('country', {
                            required: 'Por favor, insira seu País',
                        })}
                    />
                    {
                        errors.country &&
                        (<div className="text-red-500">{errors.country.message}</div>)
                    }
                </div>
                <div className='mb-4 flex justify-between'>
                    <button className="primary-button">Avançar</button>
                </div>
            </form>
        </Layout>
    )
}

ShippingScreen.auth = true;