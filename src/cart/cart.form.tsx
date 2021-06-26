import React from 'react';

interface CartFormProps {
  error: string;
  addProducts: (event: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const CartForm: React.FC<CartFormProps> = React.memo(
  ({ addProducts, error }) => (
    <form className="cart__row" onSubmit={addProducts}>
      <input type="number" />
      <button type="submit">Add item</button>
      {error ? <span className="error">{error}</span> : null}
    </form>
  )
);
