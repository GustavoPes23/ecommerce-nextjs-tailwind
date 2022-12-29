import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import data from './../../utils/data';
import { Store } from './../../utils/Store';

export default function ProductScreen() {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug);

    if (!product)
        return <div>Produto não encontrado!</div>

    const addToCartHandler = () => {
        const existItem =  state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if(product.countInStock < quantity) {
            alert('Produto esgotado!')
            return;
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ... product, quantity } });

        router.push('/cart');
    }

    return (
        <Layout title={product.name}>
            <div className='py-2 px-4'>
                <Link href="/" className="underline underline-offset-1">página inicial</Link>
                <span> {'>'} produto</span>
            </div>
            <div className='grid md:grid-cols-3 px-4'>
                <div className='md:col-span-2'>
                    <img
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive" 
                        className='rounded-lg shadow-md slug-product'>
                    </img>
                </div>
                <div className='md:ml-5'>
                    <ul>
                        <li>
                            <h1 className='text-lg font-bold'>{product.name}</h1>
                        </li>
                        <li>Categoria: {product.category}</li>
                        <li>Marca: {product.brand}</li>
                        <li>{product.rating} de {product.numReviews} avaliações</li>
                        <li>Descrição: {product.description}</li>
                    </ul>
                    <div className='card p-5 mt-4 divide-y slug-product'>
                        <div className="mb-2 flex justify-between">
                            <div>Preço</div>
                            <div className='text-lime-500 font-bold'>R${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div className="text-right">{product.countInStock > 0 ? 'Em estoque' : 'Esgotado'}</div>
                        </div>
                        <button className='primary-button w-full' onClick={addToCartHandler}>COMPRAR</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
