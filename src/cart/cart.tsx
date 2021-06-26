import React, { useCallback, useState, memo } from 'react';
import { genId } from '../utils';
import { MAX_ITEM_PRICE } from '../constants';
import { CartItem } from './cart.item';
import { CartForm } from './cart.form';
import { CartControls } from './cart.controls';

interface CartProps {
  calculate: (products: ProductsById) => void;
}

export const Cart: React.FC<CartProps> = memo(({ calculate }) => {
  const [products, setProducts] = useState<ProductsById>({});
  const [error, setError] = useState<string>('');
  const values = Object.values(products);

  const addProducts = useCallback((event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const price = event.target[0].value;
    const parsedPrice = parseInt(price, 10);

    if (Number.isNaN(parsedPrice)) {
      return;
    }

    if (parsedPrice <= 0) {
      return setError('The price can`t be negative or equal 0');
    }

    if (parsedPrice > MAX_ITEM_PRICE) {
      return setError('The item is too expensive');
    }

    const id = genId();
    const product = { id, price: parsedPrice };

    setProducts((products) => ({ ...products, [id]: product }));
    setError('');
    event.target[0].value = '';
  }, []);

  const removeProduct = useCallback((event: React.BaseSyntheticEvent) => {
    const id = event.target?.dataset?.id;

    if (id) {
      setProducts((products) => {
        const { [id]: toDelete, ...rest } = products;

        return rest;
      });
    }
  }, []);

  return (
    <div className="cart">
      <CartForm addProducts={addProducts} error={error} />
      <ul className="cart__list">
        {values.map(({ id, price }) => (
          <CartItem
            key={id}
            removeProduct={removeProduct}
            id={id}
            price={price}
          />
        ))}
      </ul>
      <CartControls
        disabled={values.length === 0}
        calculate={() => calculate(products)}
      />
    </div>
  );
});
