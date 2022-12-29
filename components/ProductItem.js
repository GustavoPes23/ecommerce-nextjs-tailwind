/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product }) {
    return (
        <div className='card rounded-xl w-64 h-96 product-item'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    
                    className="rounded shadow h-64 w-96"
                />
            </Link>
            <div className='flex flex-col items-center justify-center p-5 color-gray-second'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg font-bold'>
                        {product.name}
                    </h2>
                </Link>
                <div className='flex flex-col items-center justify-center divide-y'>
                    <p className='mb-2'>{product.brand}</p>
                    <p><span className='text-lime-500 font-bold'>R${product.price}</span><span> à vista</span></p>
                </div>
            </div>
        </div>
    )
}
