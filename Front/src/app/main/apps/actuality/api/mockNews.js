import Mock from 'mockjs';

// Fonction pour générer une URL d'image aléatoire
function getRandomImageUrl(width, height) {
  const randomId = Math.floor(Math.random() * 1000); // Génère un identifiant aléatoire
  return `https://picsum.photos/${width}/${height}?random=${randomId}`;
}

// Fonction pour générer un nombre spécifique d'actualités simulées
function generateMockNews(count) {
  const newsList = [];
  for (let i = 0; i < count; i++) {

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-10-19');
    const randomDate = new Date(  startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()) );
    const publicationDate = randomDate.toISOString().split('T')[0];

    const imageUrl = getRandomImageUrl(400, 400); // Utiliser la fonction getRandomImageUrl
    const newsData = Mock.mock({
      'id|+1': i + 1,
      'titre': '@sentence(5, 10)',
      'auteur': '@name',
      'categorie|1': ['Actualités sur la communication interne et ressources humaines', 'Actualités événementielles', 'Les blogs, articles et publications'],
      'type|1': ['type1', 'Type2', 'type3', 'type4', 'type5'],
      'description': '@paragraph(2, 4)', // Ajouter un champ description avec un texte généré aléatoirement
      'image': imageUrl, // Utiliser l'URL d'image générée aléatoirement
      'jAime|0-100': 0,
      'commentaires|0-15': 0,
      'datePublication': publicationDate, // Ajouter un champ date de publication
    });
    newsList.push(newsData);
  }
  return newsList;
}

const mockNews = generateMockNews(10);

export default mockNews;