import { getPersonajes } from './services/personajes.service';
import { Personaje } from './modelo/personaje';
import './style.css';

const searchInput = document.querySelector<HTMLInputElement>('#searchInput')!;
const searchButton = document.querySelector<HTMLButtonElement>('#searchButton')!;
const personajeGrid = document.querySelector<HTMLDivElement>('#characterGrid')!;

const renderCharacter = (personaje: Personaje): string => `
  <div class="character-card">
    <img 
      src="http://localhost:3000/${personaje.imagen}" 
      alt="${personaje.nombre}"
      class="character-image"
    >
    <div class="character-info">
      <h3>${personaje.nombre}</h3>
      <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
      <p><strong>Habilidades:</strong> ${personaje.habilidades.join(', ')}</p>
      ${personaje.amigo ? `<p><strong>Amigo:</strong> ${personaje.amigo}</p>` : ''}
    </div>
  </div>
`;

const renderCharacters = (personajes: Personaje[]): void => {
  personajeGrid.innerHTML = personajes.map(renderCharacter).join('');
};

export const handleSearch = async (): Promise<void> => {
  const searchTerm = searchInput.value.trim();
  const characters = await getPersonajes(searchTerm);
  renderCharacters(characters);
};

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});

window.addEventListener('load', async () => {
  const characters = await getPersonajes();
  renderCharacters(characters);
});