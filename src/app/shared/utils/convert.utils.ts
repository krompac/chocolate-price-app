import { BaseChocolateModel, FullChocolateModel } from '../../core/model/chocolate.model';

export function convertToFullModel(chocolate: BaseChocolateModel): FullChocolateModel {
  return {
    ...chocolate,
    prices: chocolate.prices.map((price) => {
      let pricePerUnit = Number((((price.price / price.amount) * 100) / (price.unit === 'kg' ? 1000 : 1)).toFixed(2));

      return {
        ...price,
        pricePerUnit
      };
    })
  };
}
