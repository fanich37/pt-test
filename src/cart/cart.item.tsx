import React from "react";

interface CartItemProps {
  id: Product["id"];
  price: Product["price"];
  removeProduct: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const CartItem: React.FC<CartItemProps> = React.memo(
  ({ price, id, removeProduct }) => {
    return (
      <li className="cart__row cart__item">
        <input type="number" value={price} disabled />
        <button data-id={id} onClick={removeProduct}>
          Remove item
        </button>
      </li>
    );
  }
);
