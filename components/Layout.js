import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from './../utils/Store';

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    return (
        <>
            <Head>
                <title>{title ? title + ' - SheepTown' : 'SheepTown'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
                        <Link href="/">
                            <span className='text-lg font-bold color-gray'>SheepTown</span>
                        </Link>
                        <div className="flex items-center jutify-between">
                            <Link href="/cart">
                                <span className='p-2 flex items-center jutify-between color-gray'>
                                <ShoppingBagIcon className="w-5 m-3"/>
                                {cart.cartItems.length > 0 && (
                                    <span className="rounded-full bg-blue-600 px-1 py-0.3 text-xs font-bold text-white -ml-5 -mt-4">
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </span>
                                )}
                            </span>
                            </Link>
                            <Link href="/login"><span className='p-2 color-gray'>Login</span></Link>
                        </div>
                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>
                <footer className='flex h-10 justify-center items-center shadow-inner color-gray'>
                    Copyright @ 2022 - Gustavo Pes
                </footer>
            </div>
        </>
    )
}
