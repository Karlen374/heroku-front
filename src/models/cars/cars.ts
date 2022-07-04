import { createEvent, createStore, createEffect } from 'effector';
import { ICar } from 'src/types/ICar';
import { request } from 'src/hooks/useHttp';
import { getLocalStorage } from 'src/hooks/hooks';

const apiBase = 'process.env.REACT_APP_API_URLapi/cars';

export const addCar = createEffect(async (car:ICar) => {
  const res = await request(apiBase, 'POST', JSON.stringify(car));
  return res;
});

export const saveEditCar = createEffect(async (editCar:ICar) => {
  const res = await request(apiBase, 'PUT', JSON.stringify({ ...editCar, _id: editCar.id }));
  return res;
});

export const changeLiked = createEffect(async ({ carId, userId }) => {
  const url = 'process.env.REACT_APP_API_URLapi/carLike';
  const res = await request(url, 'PUT', JSON.stringify({ carId, userId }));
  return res;
});

export const changeViewedCar = createEffect(async ({ carId, userId }) => {
  const url = 'process.env.REACT_APP_API_URLapi/carViewed';
  const res = await request(url, 'PUT', JSON.stringify({ carId, userId }));
  return res;
});

export const uploadCarPhoto = createEffect(async ({ file, carId }) => {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {
    carId,
  };
  const res = await request('process.env.REACT_APP_API_URLapi/addPhoto', 'POST', formData, headers);
  return res;
});

export const deleteCarPhoto = createEffect(async (carId: string) => {
  const headers = {
    carId,
  };
  const res = await request('process.env.REACT_APP_API_URLapi/delPhoto', 'DELETE', null, headers);
  return res;
});

export const loadCars = createEvent<ICar[]>();

export const $cars = createStore<ICar[]>([])
  .on(loadCars, (_, carsFromApi:ICar[]) => {
    return carsFromApi;
  })

  .on(saveEditCar.doneData, (cars, editCar) => {
    const data = cars.map((item) => {
      if (item.id === editCar.id) {
        return editCar;
      } else return item;
    });
    return data;
  })

  .on(addCar.doneData, (cars, newCar) => {
    return [...cars, newCar];
  })

  .on(changeLiked.doneData, (cars, likeCar) => {
    const data = cars.map((item) => {
      if (item.id === likeCar.id) {
        return likeCar;
      } else return item;
    });
    return data;
  })
  .on(uploadCarPhoto.doneData, (cars, newCar) => {
    const data = cars.map((item) => {
      if (item.id === newCar.id) {
        return newCar;
      } else return item;
    });
    getLocalStorage()?.setItem('currentCarPhoto', JSON.stringify(newCar.carPhoto));
    return data;
  })
  .on(deleteCarPhoto.doneData, (cars, newCar) => {
    const data = cars.map((item) => {
      if (item.id === newCar.id) {
        return newCar;
      } else return item;
    });
    getLocalStorage()?.setItem('currentCarPhoto', JSON.stringify(null));
    return data;
  })
  .on(changeViewedCar.doneData, (cars, viewedCar) => {
    const data = cars.map((item) => {
      if (item.id === viewedCar.id) {
        return viewedCar;
      } else return item;
    });
    getLocalStorage()?.setItem('currentCarPhoto', JSON.stringify(viewedCar.carPhoto || null));
    return data;
  });
