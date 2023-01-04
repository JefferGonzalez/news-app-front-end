export const API_URL = ({ controller, action }) => {
  return `http://localhost:80/news-app/app/Controllers/MainController.php?controller=${controller}&action=${action}`;
};
