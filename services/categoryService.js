import axios from 'axios';

const API_URL = 'http://localhost:3000/categories';

const getCategories = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('getCategories error', error);
    return [];
  }
};

const addCategory = async (category) => {
  try {
    const res = await axios.post(API_URL, category);
    return res.data;
  } catch (error) {
    console.error('addCategory error', error);
    return null;
  }
};

const removeCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('removeCategory error', error);
    return false;
  }
};

const updateCategory = async (category) => {
  try {
    const res = await axios.put(`${API_URL}/${category.id}`, category);
    return res.data;
  } catch (error) {
    console.error('updateCategory error', error);
    return null;
  }
};

export default {
  getCategories,
  addCategory,
  removeCategory,
  updateCategory,
};
