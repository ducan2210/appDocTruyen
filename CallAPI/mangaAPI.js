import axios from 'axios';

const API_URL = 'https://comics-api.vercel.app/v2';

export const danhSachMangaTopTrenđding = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/trending-comics?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const danhSachMangaDeXuat = async () => {
  try {
    const response = await axios.get(`${API_URL}/recommend-comics`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const danhSachMangaMoi = async (page, status) => {
  try {
    const response = await axios.get(`${API_URL}/new-comics?page=${page}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const danhSachMangaMoiCapNhat = async (page, status) => {
  try {
    const response = await axios.get(`${API_URL}/recent-update-comics?page=${page}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const reviewManga = async (comicId) => {
  try {
    const response = await axios.get(`${API_URL}/comics/${comicId}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const loadChapter = async (comicId, chapter) => {
  try {
    const response = await axios.get(`${API_URL}/comics/${comicId}/chapters/${chapter}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const loadCmt = async (comicId) => {
  try {
    const response = await axios.get(`${API_URL}/comics/${comicId}/comments`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const loadGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const loadComicByGenres = async (idGenre) => {
  try {
    const response = await axios.get(`${API_URL}/genres/${idGenre}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const searchComics = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${query}&page=1`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const loadTopComics = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/top/${query}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};
