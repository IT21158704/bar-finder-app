import express from 'express';
import { createStore, getMyStores, deleteStore, updateStore } from '../controllers/StoreController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const storeRouter = express.Router();

storeRouter.post('/create-store', LoginValidator, createStore);
storeRouter.get('/get-my-stores', LoginValidator, getMyStores);
storeRouter.delete('/delete-store/:id', deleteStore);
storeRouter.put('/update-store/:id', updateStore);

export default storeRouter;