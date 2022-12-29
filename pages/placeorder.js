import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from './../components/CheckoutWizard';
import { Store } from './../utils/Store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + taxPrice);
    const router = useRouter();

    useEffect(() => {
        if(!paymentMethod) router.push('/payment')
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                totalPrice
            });

            setLoading(false);
            dispatch({ type: 'CART_CLEAR_ITEMS' });

            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            );

            router.push(`/order/${data._id}`);

        } catch (error) {
            setLoading(false);
            toast.error(getError(error))
        }
    }

    return (
        <Layout title="Confirmação de Compra">
            <CheckoutWizard activeStep={3} />
            <h1 className="mb-4 text-xl">Confirmação de Compra</h1>
            {cartItems.lenght === 0
                ? (<div>
                    O carrinho está vázio. <Link href="/">Ver Produtos.</Link>
                </div>)
                : (<div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Endereço da compra</h2>
                            <div>
                                {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                                {shippingAddress.city}, {shippingAddress.cep}, {' '}
                                {shippingAddress.pais}
                            </div>
                            <div>
                                <Link href="/shipping">Editar</Link>
                            </div>
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Método de pagamento</h2>
                            <div>{paymentMethod}</div>
                            <div>
                                <Link href="/payment">Editar</Link>
                            </div>
                        </div>
                        <div className="card overflow-x-auto p-5">
                            <h2 className="mb-2 text-lg">Produtos</h2>
                            <table className="min-w-full">
                                <thead className='border-b'>
                                    <tr>
                                        <th className='px-5 text-left'>Item</th>
                                        <th className='p-5 text-right'>Quantidade</th>
                                        <th className='p-5 text-right'>Preço</th>
                                        <th className='p-5'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id} className="border-b">
                                             <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <span className='flex items-center font-bold'>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                            className='rounded-lg shadow-md'>
                                                        </Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="p-5 text-right">
                                                R${item.price}
                                            </td>
                                            <td className="p-5 text-right">
                                                R${item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <Link href="/cart">Editar</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Resultado</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Itens</div>
                                        <div>R${itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Frete</div>
                                        <div>R${taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Total</div>
                                        <div>R${totalPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                    disabled={loading}
                                    onClick={placeOrderHandler}
                                    className="primary-button w-full">
                                        {loading ? 'Carregando ...' : 'Confirmar'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>)
            }
        </Layout>
    )
}

PlaceOrderScreen.auth = true;