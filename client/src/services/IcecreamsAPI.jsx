const API_URL = '/api/icecreams'

const request = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
    }
    return data
}

const getAllIcecreams = () => request(API_URL)

const getIcecream = (id) => request(`${API_URL}/${id}`)

const createIcecream = (icecream) => request(API_URL, {
    method: 'POST',
    body: JSON.stringify(icecream)
})

const updateIcecream = (id, icecream) => request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(icecream)
})

const deleteIcecream = (id) => request(`${API_URL}/${id}`, {
    method: 'DELETE'
})

export default {
    getAllIcecreams,
    getIcecream,
    createIcecream,
    updateIcecream,
    deleteIcecream
}
