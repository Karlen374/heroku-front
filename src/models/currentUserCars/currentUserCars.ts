import { createEffect, createStore } from 'effector';
import { request } from 'src/hooks/useHttp';
import { ICar } from 'src/types/ICar';

export const loadCurrentUserCars = createEffect(async (id:string) => {
  const res = await request('https://backend-car.herokuapp.com/api/cars');
  return res.filter((car) => car.userId === id);
});

export const $currentUserCars = createStore<ICar[]>([])
  .on(loadCurrentUserCars.doneData, (_, cars) => cars);
