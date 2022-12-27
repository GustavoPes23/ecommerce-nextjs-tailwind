/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product }) {
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded shadow"
                />
            </Link>
            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg font-bold'>
                        {product.name}
                    </h2>
                </Link>
                <p className='mb-2'>{product.brand}</p>
                <p>R${product.price}</p>
                <button className='primary-button mt-2' type="button">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    )
}
