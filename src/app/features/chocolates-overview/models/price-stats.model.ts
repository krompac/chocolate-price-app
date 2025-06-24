import { BasePriceModel } from '../../../core/model/chocolate.model';

export type PriceStats = {
  minPrice: string;
  avgPrice: string;
  cheapestShop: BasePriceModel;
};
