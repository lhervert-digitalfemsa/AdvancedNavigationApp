

export type ProductT = {
  id: number;
  title: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: RatingT;
}

type RatingT = {
  rate: number;
  count: number;
}