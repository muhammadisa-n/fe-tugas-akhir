import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllProducts = async () => {
    try {
        const response = await axiosJWT.get('admin/products')
        return response.data.product
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const changeStatusProduct = async (id, status) => {
    try {
        const response = axiosJWT.patch(`admin/products/change-status/${id}`, {
            is_active: status,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const countProduct = async () => {
    try {
        const response = await axiosJWT.get('admin/products')
        return response.data.amount
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countSeller = async () => {
    try {
        const response = await axiosJWT.get('admin/count-seller')
        return response.data.amount
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countCustomer = async () => {
    try {
        const response = await axiosJWT.get('admin/count-customer')
        return response.data.amount
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const createCategory = async (data) => {
    try {
        const response = await axiosJWT.post('admin/category', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getDetailCategory = async (id) => {
    try {
        const response = await axiosJWT.get('admin/category/' + id)
        return response.data.category
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateCategory = async (id, data) => {
    try {
        const response = await axiosJWT.put('admin/category/' + id, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const deleteCategory = async (id) => {
    try {
        const response = await axiosJWT.delete('admin/category/' + id)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
