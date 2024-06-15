import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '@utils/services/productServices.js'
import { useCart } from '@context/CartContext.jsx'
import { addCart } from '@utils/services/cartServices.js'
import MainLayout from '@layouts/MainLayout'
import { useUser } from '@context/userContext.jsx'

const DetailProductPage = () => {
    const { refreshCart } = useCart()
    const { role } = useUser()
    const token = localStorage.getItem('access_token')
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [totalProduct, setTotalProduct] = useState(1)
    const [productNotFound, setProductNotFound] = useState(false)
    const decrease = () => {
        if (totalProduct === 1) {
            return
        }
        {
            setTotalProduct((prev) => prev - 1)
        }
    }
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id)
                setProduct(response)
            } catch (error) {
                if (error.status_code === 404) {
                    setProductNotFound(true)
                }
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        const data = {
            total_product: totalProduct,
            total_price: product.price * totalProduct,
            product_id: product.id,
        }
        try {
            await addCart(data)
            refreshCart()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <MainLayout>
            {productNotFound ? (
                <div className='flex items-center justify-center max-w-full min-h-screen'>
                    <div>
                        <h5 className='text-center text-slate-400 text-4xl'>
                            Data Product Not Found
                        </h5>
                    </div>
                </div>
            ) : (
                <div className=' flex flex-col md:flex-row md:px-[200px] md:py-[100px] mt-24 '>
                    <div className='md:basis-1/2 md:flex md:flex-col md:justify-between'>
                        <div className='hidden md:block '>
                            <img
                                className='object-cover cursor-pointer rounded-xl w-[400px] h-[400px]'
                                src={product.image_url}
                                alt='product-image'
                            />
                        </div>
                        <div className='md:hidden'>
                            <img
                                className='w-[100%] h-[300px] object-cover mt-10 rounded-2xl mx-2 my-5'
                                src={product.image_url}
                                alt='product-image'
                            />
                        </div>
                    </div>
                    <div className='description p-6 md:basis-1/2 md:py-[40px]'>
                        <p className='text-orange text-[14px] tracking-widest uppercase font-[700] mb-6'>
                            {product.Category?.name}
                        </p>
                        <h1 className='text-3xl md:text-4xl capitalize font-[700]'>
                            {product.name}
                        </h1>
                        <p className='hidden my-10 leading-7 md:block text-darkGrayishBlue'>
                            {product.description}
                        </p>
                        <p className='my-6 leading-7 md:hidden text-darkGrayishBlue'>
                            {product.description}
                        </p>

                        <div className='flex items-center price'>
                            <span className='text-3xl font-[700] mr-4'>
                                Rp. {product.price}
                            </span>
                        </div>
                        {token && role === 'Customer' && (
                            <div className='flex flex-col mt-8 md:flex-row'>
                                <div className=' w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]'>
                                    <button
                                        onClick={decrease}
                                        className=' text-[24px] md:text-[20px] font-[700] text-primary transition-all hover:opacity-50 px-2 border'>
                                        -
                                    </button>
                                    <p className='md:text-[14px] font-bold'>
                                        {totalProduct}
                                    </p>
                                    <button
                                        onClick={() =>
                                            setTotalProduct((prev) => prev + 1)
                                        }
                                        className=' text-[24px] md:text-[20px] font-[700] text-primary border px-2 transition-all hover:opacity-50'>
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className=' border-none bg-primary rounded-lg text-white font-[700] px-[70px] py-[18px] mt-4 md:mt-0 md:py-0 md:text-[14px] transition-all btn-shadow hover:opacity-50 shadow-xl'>
                                    Add to cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default DetailProductPage
