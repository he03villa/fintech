import axios from 'axios'
import apiMarke from "../api/api";
import { Alert } from './service';

const getAll = async () => {
    const res = await apiMarke.get('/students');
    return res.data
}
const saveMarke = async (data) => {
    const res = await apiMarke.post('/students', data).catch(error => {
        console.log(error.response.data.mensaje);
        Alert('error', '', error.response.data.mensaje, 'Aceptar');
        return;
    });
    return res?.data;
}
const updateMarke = async (data, url) => {
    console.log(url);
    const res = await axios.put(url, data).catch(error => {
        console.log(error.response.data.mensaje);
        Alert('error', '', error.response.data.mensaje, 'Aceptar');
        return;
    });
    return res?.data
}
const deleteMarke = async (url) => {
    const res = await axios.delete(url).catch(error => {
        console.log(error.response.data.mensaje);
        Alert('error', '', error.response.data.mensaje, 'Aceptar');
        return;
    });
    return res?.data;
}

export {
    getAll,
    saveMarke,
    updateMarke,
    deleteMarke
}