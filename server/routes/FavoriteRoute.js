import express from 'express';
import { createFavorite, getFavorites, removeFavorite } from '../controllers/FavoriteController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const FavoriteRouter = express.Router();

FavoriteRouter.post('/create-Favorite', LoginValidator, createFavorite);
FavoriteRouter.get('/Favorites', LoginValidator, getFavorites);
FavoriteRouter.delete('/remove-Favorite/:id', removeFavorite);

export default FavoriteRouter;