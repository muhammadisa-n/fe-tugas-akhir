import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllProducts = async (page, size, search) => {
    try {
        const response = await axiosJWT.get('seller/products', {
            params: { page, size, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const getDetailProduct = async (id) => {
    try {
        const response = await axiosJWT.get('products/' + id)
        return response.data.product
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const createProduct = async (data) => {
    try {
        const response = await axiosJWT.post('seller/products/', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateProduct = async (id, data) => {
    try {
        const response = await axiosJWT.put('seller/products/' + id, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axiosJWT.delete('seller/products/' + id)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const countProduct = async () => {
    try {
        const response = await axiosJWT.get('seller/products/count')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
