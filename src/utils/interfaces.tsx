export interface FoodItem {
  CategoryName: string;
  _id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  quantity: number;
}

export interface Category {
  name: string;
  items: FoodItem[];
}
export interface User {
  name: string;
  email: string;
}
