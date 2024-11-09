import axios from 'axios';
import { BaseURL } from '../Global/BaseUrl';

export const getAllProducts = async () => {
    const products =  await axios.get(`${BaseURL}/products`);
    console.log('products in Service = ',products.data);
    return products.data;
}

export const getProduct = (id) => {
    return axios.get(`${BaseURL}/products/${id}`);
}

export const saveProduct = (data) => {
    const url = `${BaseURL}/products`;
    return axios.post(url,data);

}

export const editProduct = (productData) => {
    const url = `${BaseURL}/products/${productData.id}`;
    console.log('in edit product Data =',productData);
    return axios.post(url,productData);
}

export const removeProduct = (id) => {
    const url = `${BaseURL}/products/${id}`;
    return axios.delete(url,id);
}



export const getAllUsers = () => {
    return axios.get(`${BaseURL}/users`);
}

export const getUser = (id) => {
    return axios.get(`${BaseURL}/users/${id}`);
}
