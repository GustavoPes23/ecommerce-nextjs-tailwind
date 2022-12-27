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
            <div className='py-2'>
                <Link href="/">Página inicial</Link>
            </div>
            <div className='gird md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        layout="responsive">
                    </Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className='text-lg'>{product.name}</h1>
                        </li>
                        <li>Categoria: {product.category}</li>
                        <li>Marca: {product.brand}</li>
                        <li>{product.rating} de {product.numReviews} reviews</li>
                        <li>Descrição: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className='card p-5'>
                        <div className="mb-2 flex justify-between">
                            <div>Preço</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'Em estoque' : 'Esgotado'}</div>
                        </div>
                        <button className='primary-button w-full' onClick={addToCartHandler}>Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
