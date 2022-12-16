import { IRate } from './Rate';

export interface IProductRate {
  reviews: IRate[],
  rating: number,
  stars: number[]
}
