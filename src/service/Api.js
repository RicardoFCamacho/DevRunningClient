import axios from 'axios'

const Api = base => {
    const client = axios.create({
        baseURL: base
    })

    //função para pegar o token
    const getAuthHeader = () => {
        const token = localStorage.getItem('token') 
        return {
            headers:{
                Authorization: 'Bearer '+token
            }
        }
    }
    
    const get = endpoint => client.get(endpoint, getAuthHeader())
       
    const remove = endpoint => client.delete(endpoint, getAuthHeader()) 
       
    const update = (endpoint, data) => client.patch(endpoint, data, getAuthHeader())
   
    const create = (endpoint, data) => client.post(endpoint, data, getAuthHeader())
       
    const login = (endpoint, user) => client.post(endpoint, user)

    return {
       getUser: id => get(`/users/${id}`),
       getUsers: () => get(`/users`),
       removeUser: id => remove(`/users/${id}`),
       updateUser: data => update(`/users/${data.id}`, data),
       createUser: data => create(`/users`, data), 
       
       getRuns: admin => get(`/runs${admin}`),
       removeRun: id => remove(`/runs/${id}`),
       createRun: data => create(`/runs`, data),

       getCategory: id => get(`/categories/${id}`),
       getCategories: admin => get(`/categories`),
       removeCategory: id => remove(`/categories/${id}`),
       createCategory: data => create(`/categories`, data),
       updateCategory: data => update(`/categories/${data.id}`, data),

       login: user => login(`/users/login`, user)
    }
}
export default Api