import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(res => res.data)
}

const deletePerson = (id, personToDelete) => {
    return axios.delete(`${baseUrl}/${id}`, personToDelete)
}

export default {
    getAll,
    create,
    deletePerson
}