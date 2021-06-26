type Product = {
  id: string;
  price: number;
};

type Currency = {
  key: string;
  rate: number;
};

type ProductsById = Record<Product["id"], Product>;
