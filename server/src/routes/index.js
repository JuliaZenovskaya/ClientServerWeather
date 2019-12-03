import express from 'express';
import { addCity, deleteCity, getCities} from '../controller/favouriteCitiesController';
import { getWeatherByCityName, getWeatherByCoords } from '../controller/weatherForecastController';

const router = express.Router();

router.get('/weather', getWeatherByCityName);

router.get('/weather/coordinates', getWeatherByCoords);

router.get('/favourites', getCities)
router.post('favourites', addCity);
router.delete('/favourites/:id', deleteCity);

export default router;
