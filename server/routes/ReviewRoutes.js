import express from 'express';
import { createReview, getStoreReviews, deleteReview, updateReview } from '../controllers/ReviewController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const reviewRouter = express.Router();

reviewRouter.post('/create-review', LoginValidator, createReview);
reviewRouter.post('/get-reviews', LoginValidator, getStoreReviews);
reviewRouter.delete('/delete-review/:id', deleteReview);
reviewRouter.put('/update-review/:id', updateReview);

export default reviewRouter;