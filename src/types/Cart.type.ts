
export type CartT = CartProductT[];


export type CartProductT = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}