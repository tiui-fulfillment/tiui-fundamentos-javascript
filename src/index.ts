(async () => {
    const { default: fetch } = await import('node-fetch');
  
    const A: string = 'https://rickandmortyapi.com/api/character/';
  
    const fetchData = async (url: string): Promise<any> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };
  
    const main = async (): Promise<void> => {
      try {
        console.log('Primer Llamado...');
        const data = await fetchData(A);
  
        console.log('Segundo Llamado...');
        const character = await fetchData(`${A}${data.results[0].id}`);
  
        console.log('Tercer Llamado...');
        const origin = await fetchData(character.origin.url);
  
        console.log(`Personajes: ${data.info.count}`);
        console.log(`Primer Personaje: ${character.name}`);
        console.log(`Dimensión: ${origin.dimension}`);
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
      }
    };
  
    main();
  })();
  