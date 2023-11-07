import Mock from 'mockjs';
import mockNews from './mockNews';

// Fonction pour générer une liste de commentaires simulés
function generateMockComments(newsId, count) {
  const comments = [];
  for (let i = 0; i < count; i++) {

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-10-17'); 
    const isApproved = Mock.Random.boolean();

    // Générer une date aléatoire entre janvier 2023 et la date actuelle
    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );

    const formattedDate = randomDate.toISOString().split('T')[0];

    const commentData = Mock.mock({
      'id|+1': i + 1,
      'auteur': '@name',
      'actualiteId': newsId,
      'contenu': '@paragraph(1, 2)', // Générer un contenu de commentaire aléatoire
      'datePublication': formattedDate,
      'approuver': isApproved
    });
    comments.push(commentData);
  }
  return comments;
}

// Générer des commentaires pour chaque actualité dans mockNews
const newsWithComments = mockNews.map((news) => {
  const commentCount = Mock.Random.integer(0, 7); // Générer un nombre aléatoire de commentaires
  const comments = generateMockComments(news.id, commentCount);
  return {
    ...news,
    'commentaires': comments, // Ajouter la liste de commentaires à l'actualité
  };
});

export default newsWithComments;
