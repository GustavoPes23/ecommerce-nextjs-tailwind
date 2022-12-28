import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout';
import { Store } from './../utils/Store';
import dynamic from 'next/dynamic';
import { TrashIcon } from '@heroicons/react/24/solid';

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
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    };

    return (
        <Layout title="Carrinho">
        <Link href="/" className="underline underline-offset-1">página inicial</Link>
            <span className="mb-4 text-gray"> {'>'} carrinho</span>
            {
                cartItems.length === 0
                    ? (<div className="mt-4 font-bold grid">
                        Ops... parece que seu carrinho está vázio.
                        <button className='primary-button w-64 mt-4'><Link href="/">ESCOLHER PRODUTO</Link></button>
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
                                                                height={50}
                                                                className='rounded-lg shadow-md'>
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
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    <span class="text-lime-500 font-bold">R${item.price}</span>
                                                </td>
                                                <td className='p-5 text-center'>
                                                    <button onClick={() => removeItemHandler(item)} title="Remover item">
                                                        <TrashIcon className="h-5 w-5 text-blue-500"></TrashIcon>
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
                                            Total: <span class="text-lime-500 font-bold">R$ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={() => router.push('login?redirect=/shipping')} className="primary-button w-full text-bold">
                                            PAGAR
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

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });