import express from 'express';
import { addCity, deleteCity, getCities} from '../controllers/favouriteCitiesController';
import { getWeatherByCityName, getWeatherByCoords } from '../controllers/weatherForecastController';

const router = express.Router();

router.get('/weather', getWeatherByCityName);

router.get('/weather/coordinates', getWeatherByCoords);

router.get('/favourites', getFavourites)
router.post('favourites', addToFavourites);
router.delete('/favourites/:id', fdeleteFromFavourites);

export default router;
