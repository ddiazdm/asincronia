import { Personaje } from '../modelo/personaje';

const API_URL = 'http://localhost:3000/personajes';

export const getPersonajes = async (searchTerm: string = ''): Promise<Personaje[]> => {
  const url = searchTerm 
    ? `${API_URL}?nombre_like=${searchTerm}`
    : API_URL;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};