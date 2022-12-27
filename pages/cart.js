import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import Router, { useRouter } from 'next/router'
import { XCircleIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import { Store } from './../utils/Store';
import dynamic from 'next/dynamic';

function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems }
    } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    const updateCartHandler = (item, quantityString) => {
        const quantity = Number(quantityString);
        dispatch({ type: 'CART_ADD_ITEM', payload:{...item, quantity} });
    };

    return (
        <Layout title="Carrinho">
            <h1 className="mb-4 text-xl">Carrinho</h1>
            {
                cartItems.length === 0
                    ? (<div>
                        O carrinho está vázio. <Link href="/">Página inicial</Link>
                    </div>)
                    : (
                        <div className='grid md:grid-cols-4 md-gap-5'>
                            <div className='overflow-x-auto md:col-span-3'>
                                <table className='min-w-full'>
                                    <thead className='border-b'>
                                        <tr>
                                            <th className='px-5 text-left'>Item</th>
                                            <th className='p-5 text-right'>Quantidade</th>
                                            <th className='p-5 text-right'>Preço</th>
                                            <th className='p-5'>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.slug} className='border-b'>
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <span className='flex items-center font-bold'>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}>
                                                            </Image>
                                                            &nbsp;
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                    </select>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    ${item.price}
                                                </td>
                                                <td className='p-5 text-center'>
                                                    <button onClick={() => removeItemHandler(item)} title="Remover item">
                                                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card p-5 ml-6 mt-3'>
                                <ul>
                                    <li>
                                        <div className='pb-3 text-xl'>
                                            Quantidade: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                                            {' '}
                                        </div>
                                        <div className='pb-3 text-xl'>
                                        Total: R$ { cartItems.reduce((a, c) => a + c.quantity * c.price, 0) }
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={() => router.push('/shipping')} className="primary-button w-full">
                                            Pagar
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), {ssr:false});