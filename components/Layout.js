import Head from 'next/head'
import Nav from './Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, children }) {
       return (
        <>
            <Head>
                <title>{title ? title + ' - SheepTown' : 'SheepTown'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position='bottom-center' limit={1}/>

            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <Nav />
                </header>
                <main className='container m-auto mt-4 lg:px-44 md:px-4'>
                    {children}
                </main>
                <footer className='flex h-10 justify-center items-center shadow-inner color-gray'>
                    Copyright @ 2022 - Gustavo Pes
                </footer>
            </div>
        </>
    )
}
