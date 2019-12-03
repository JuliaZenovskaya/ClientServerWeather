import FavouriteCity from '../model/city'

export const addCity = (req, res) => {
  const city = new FavouriteCity({
    name: req.body.name
  });
  city
    .save()
    .then(
      newCity => res.status(201)
      .json({
        success: true,
        message: 'Success',
        newCity
      }))
    .catch(
      error => res.status(404).json({
        success: false,
        message: 'Error here',
        error
      }));
};

export const deleteCity = (req, res) => {
  FavouriteCity
    .findOneAndDelete({
      _id: req.params.id
    })
    .then(
      () => res.json({
        success: true,
        message: 'Success'
      }))
    .catch(
      error => res.status(404).json({
        success: true,
        message: 'Error',
        error
      }));
};

export const getCities = (req, res) => {
  FavouriteCity
    .find()
    .then(
      cities => res.json(cities)
    )
    .catch(
      error => res.status(500).json({
        success: false,
        message: 'Error',
        error
      }));
}
