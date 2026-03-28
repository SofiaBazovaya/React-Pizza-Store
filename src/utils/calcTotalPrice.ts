import { CartItemInput } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items:CartItemInput[]) => {
  return items.reduce((sum: number, obj: CartItemInput) =>  sum + obj.price * obj.count, 0);
}
 