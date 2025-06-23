export type BaseChocolateModel = {
  id: string;
  name: string;
  brand: string;
  currency: 'EUR';
  prices: BasePriceModel[];
  nutrition: NutritionModel;
};

export type FullChocolateModel = Omit<BaseChocolateModel, 'prices'> & { prices: FullPriceModel[] };

export type BasePriceModel = {
  price: number;
  shop: string;
  link: string;
  unit: 'kg' | 'g';
  amount: number;
};

export type FullPriceModel = BasePriceModel & { pricePerUnit: number };

export type NutritionModel = {
  fat: {
    total: number;
    saturated: number;
  };
  carbohydrates: {
    total: number;
    sugar: number;
  };
  protein: number;
  salt: number;
};
