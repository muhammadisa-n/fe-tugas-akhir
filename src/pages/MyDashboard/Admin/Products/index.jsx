import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import {
    getAllProducts,
    changeStatusProduct,
} from '@utils/services/adminServices.js'
import { Link } from 'react-router-dom'
const AdminProductsPage = () => {
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const fetchProducts = async () => {
        try {
            const response = await getAllProducts()
            setProducts(response)
        } catch (error) {
            console.error('Error Fetching Product', error)
        }
    }

    const handleUpdateStatus = async (productId, newStatus) => {
        try {
            await changeStatusProduct(productId, newStatus)
            setProducts(
                products.map((product) =>
                    product.id === productId
                        ? { ...product, is_active: newStatus }
                        : product
                )
            )
        } catch (error) {
            console.error('Error Updating Product Status', error)
        }
    }

    useEffect(() => {
        if (token) {
            fetchProducts()
        }
    }, [token])

    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        List Products
                    </h1>
                </div>
                <div className='mt-5 basis-[85%]  '>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white rtl:text-right border'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Product name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Category
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Price
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Status
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr className='text-black  border-b'>
                                        <td className='px-6 py-4'>
                                            No Data Product
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {products.map((product, index) => (
                                            <tr
                                                className='text-black bg-white border-b '
                                                key={index}>
                                                <td className='px-6 py-4'>
                                                    {product.name}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {product.Category.name}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {product.price}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <select
                                                        value={
                                                            product.is_active
                                                        }
                                                        onChange={(event) =>
                                                            handleUpdateStatus(
                                                                product.id,
                                                                JSON.parse(
                                                                    event.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className='bg-white text-black border py-2'>
                                                        <option value={true}>
                                                            Active
                                                        </option>
                                                        <option value={false}>
                                                            Not Active
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <Link
                                                        type='button'
                                                        to={`/my-dashboard/admin/products/detail/${product.id}`}
                                                        className='p-2  mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminProductsPage
