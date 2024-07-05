export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type ShippingInfo = {
  address: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type Change = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type Count = {
  revenue: number;
  products: number;
  users: number;
  orders: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryPercentage: Record<string, number>[];
  changePercent: Change;
  count: Count;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
    rest: number;
  };
  latestTransaction: LatestTransaction[];
};

export type Pie = {
  orderFullfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Record<string, number>[];
  stockAvailability: {
    outOfStock: number;
    inStock: number;
  };
  revenueDistrubution: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  userAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};

export type Line = {
  users: number[],
  products: number[],
  discount : number[],
  revenue : number[],
};
