const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = async (url) => {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error(`Error ${url}`)
  }
}

const X = async (a) => {
  try {
    console.log("Primer llamado...")
    const characters = await fetchData(a);

    console.log("Segundo llamado...")
    const firstCharacter = await fetchData(a + characters.results[0].id);

    console.log("Tercer llamado...")
    const firstCharacterOrigin = await fetchData(firstCharacter.origin.url);

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${firstCharacterOrigin.dimension}`);

  } catch (error) {
    console.error(error)
  }
};

X(A)