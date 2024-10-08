import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllCarts = async () => {
    try {
        const response = await axiosJWT.get('/customer/carts')
        return response.data.carts
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const addCart = async (data) => {
    try {
        const response = await axiosJWT.post('/customer/carts', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateCartTotalProduk = async (productId, total_produk) => {
    try {
        const response = await axiosJWT.patch(
            `/customer/carts/${productId}/quantity`,
            { total_produk: total_produk }
        )
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const deleteCart = async (productId) => {
    try {
        const response = await axiosJWT.delete('/customer/carts/' + productId)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const createOrder = async (data) => {
    try {
        const response = await axiosJWT.post('/customer/orders', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllOrder = async () => {
    try {
        const response = await axiosJWT.get('/customer/orders')
        return response.data.orders
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getDetailOrder = async (id) => {
    try {
        const response = await axiosJWT.get(`/customer/orders/${id}`)
        return response.data.order
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const updateOrder = async (id, data) => {
    try {
        const response = await axiosJWT.put(`/customer/orders/${id}`, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const cancelOrder = async (id) => {
    try {
        const response = await axiosJWT.patch(`/customer/orders/${id}/cancel`)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const UpdateStatusOrder = async (id, data) => {
    try {
        const response = await axiosJWT.patch(
            `/customer/orders/${id}/status-order`,
            data
        )
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const getAllProductRecomendation = async (page, take, search) => {
    try {
        const response = await axiosJWT.get('/customer/products', {
            params: { page, take, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
