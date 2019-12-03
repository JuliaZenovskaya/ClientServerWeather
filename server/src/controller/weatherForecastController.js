import axios from 'axios';

export const getWeatherByCityName = (req, res, next) => {
    const city = req.query.city;

    if (typeof city !== 'string' || city.length < 1) {
        res.status(404).json({
          success: false,
          message: 'Error'
        });
    } else {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e972dcd233bab1ebce419c370711921f`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.status(404).json({
                  success: false,
                  message: 'Error',
                  error
                });
            });
    }
};

export const getWeatherByCoords = (req, res, next) => {
    const long = parseFloat(req.query.long);
    const lat = parseFloat(req.query.lat);

    if (!isNaN(long) && !isNaN(lat)) {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e972dcd233bab1ebce419c370711921f`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.status(400).json({
                  success: false,
                  message: `Error`,
                  error
                });
            });
    } else {
        res.status(404).json({
          success: false,
          message: 'error'
        });
    }
};
