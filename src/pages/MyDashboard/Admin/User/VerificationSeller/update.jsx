import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import {
    getDetailSeller,
    updateStatusSeller,
} from '@utils/services/adminServices'
import profileImage from '@assets/userdefault.png'
import Swal from 'sweetalert2'
const AdminChangeStatuslSellerPage = () => {
    const { id } = useParams()
    const [seller, setSeller] = useState([])
    const [sellerNotFound, setSellertNotFound] = useState(false)
    const navigate = useNavigate()
    const handleActivate = async (id, status) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateStatusSeller(id, status)
                    Swal.fire({
                        title: 'success',
                        text: `${response.message}`,
                        icon: 'success',
                    })
                    navigate('/my-dashboard/admin/verify-sellers')
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: `${error.message}`,
                        icon: 'error',
                    })
                }
            }
        })
    }
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await getDetailSeller(id)
                setSeller(response)
            } catch (error) {
                if (error.status_code === 404) {
                    setSellertNotFound(true)
                }
            }
        }
        fetchSeller()
    }, [id])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Detail Seller
                    </h1>
                </div>
                {sellerNotFound ? (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <h5 className='text-2xl text-center'>
                            Seller Not Found
                        </h5>
                    </div>
                ) : (
                    <div className='pb-4 mt-5'>
                        <div className='flex flex-col max-w-full mt-10'>
                            <div className='container px-4 py-8 mx-auto'>
                                <div className='w-full mx-auto bg-white rounded-lg shadow-md'>
                                    <div
                                        className={`justify-between md:flex  w-full`}>
                                        <div className='px-4 py-8'>
                                            <img
                                                className='object-cover w-full h-48 rounded-full md:w-48'
                                                src={
                                                    seller?.ava_image_url
                                                        ? seller.ava_image_url
                                                        : profileImage
                                                }
                                                alt='Profil-image'
                                            />
                                        </div>
                                        <div className='flex items-start px-4 py-8'>
                                            <div>
                                                <h2 className='text-2xl font-semibold text-gray-800'>
                                                    {seller?.nama}
                                                </h2>
                                                <p className='mt-2 text-gray-600'>
                                                    Email: {seller?.email}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Phone: {seller?.no_hp}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Address:{' '}
                                                    {`${seller?.alamat}, ${seller?.kelurahan} ${seller?.kecamatan}, ${seller?.kota}, ${seller?.provinsi}, ${seller?.kode_pos}`}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Link Gmaps Toko:{' '}
                                                    <a
                                                        href={
                                                            seller?.link_map_alamat_toko
                                                        }
                                                        className='text-blue-500 underline'
                                                        target='_blank'>
                                                        {
                                                            seller?.link_map_alamat_toko
                                                        }
                                                    </a>
                                                </p>

                                                <div className=''>
                                                    <button
                                                        disabled={
                                                            seller.status ===
                                                            'Diterima'
                                                        }
                                                        className={`px-2 py-2 mt-3 text-white  rounded focus:outline-none ${seller.status === 'Ditolak' || seller.status === null ? 'bg-green-500' : 'bg-green-800'}`}
                                                        onClick={() =>
                                                            handleActivate(
                                                                seller.id,
                                                                'Diterima'
                                                            )
                                                        }>
                                                        Terima
                                                    </button>
                                                    <button
                                                        disabled={
                                                            seller.status ===
                                                            'Ditolak'
                                                        }
                                                        className={`mx-2 px-2 py-2 mt-3 text-white  rounded focus:outline-none ${seller.status === 'Diterima' || seller.status === null ? 'bg-red-500' : 'bg-red-800'}`}
                                                        onClick={() =>
                                                            handleActivate(
                                                                seller.id,
                                                                'Ditolak'
                                                            )
                                                        }>
                                                        Tolak
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdminChangeStatuslSellerPage
