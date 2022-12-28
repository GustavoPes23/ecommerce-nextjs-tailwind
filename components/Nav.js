
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from './../utils/Store';

export default function NavScreen() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems]);

    return (
        <nav className='flex h-12 items-center md:px-4 md:justify-between lg:justify-center lg:px-0 shadow-md'>
            <Link href="/" className='lg:mx-96 lg:px-16'>
                <span className='text-lg font-bold color-gray'>SheepTown</span>
            </Link>
            <div className="flex items-center jutify-between lg:mx-96 lg:px-16">
                <Link href="/cart">
                    <span className='p-2 flex items-center jutify-between color-gray'>
                        <ShoppingBagIcon className="w-5 m-3" />
                        {cartItemsCount > 0 && (
                            <span className="rounded-full bg-sky-500 px-1 py-0.3 text-xs font-bold text-white -ml-5 -mt-4">
                                {cartItemsCount}
                            </span>
                        )}
                    </span>
                </Link>
                <Link href="/login"><span className='p-2 color-gray'><UserCircleIcon className='w-5' /></span></Link>
            </div>
        </nav>
    )
}