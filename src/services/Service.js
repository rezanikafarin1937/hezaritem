import axios from 'axios';

// const SERVER_URL =  'http://localhost:9000';
const  SERVER_URL = "http://localhost/back-sef/public/api";

export const getAllProducts = async () => {
    const products =  await axios.get(`${SERVER_URL}/products`);
    console.log('products in Service = ',products.data);
    return products.data;
}

export const getProduct = (id) => {
    return axios.get(`${SERVER_URL}/products/${id}`);
}

export const saveProduct = (data) => {
    const url = `${SERVER_URL}/products`;
    return axios.post(url,data);

    //یک روش دیگر استفاده از axios
    // axios({
    //     method: 'post',
    //     url: SERVER_URL + '/products',
    //     data : data
    //   }).then(res => console.log('javab =' ,res.data)).catch(err => console.log(err.message));
}

export const editProduct = (productData) => {
    const url = `${SERVER_URL}/products/${productData.id}`;
    console.log('in edit product Data =',productData);
    return axios.post(url,productData);
}

export const removeProduct = (id) => {
    const url = `${SERVER_URL}/products/${id}`;
    return axios.delete(url,id);
}



export const getAllUsers = () => {
    return axios.get(`${SERVER_URL}/users`);
}

export const getUser = (id) => {
    return axios.get(`${SERVER_URL}/users/${id}`);
}
