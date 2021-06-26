import { useCallback, useState } from 'react';
import { Cart } from './cart/cart';
import { api } from './api';
import { getKeys } from './utils';
import { Currencies } from './constants';
import { Info } from './info';
import './styles.css';

export const App = () => {
  const [result, setResult] = useState<string>('');
  const calculate = useCallback(
    async (products: ProductsById) => {
      if (result) setResult('');

      const { USD, GBP, EUR, JPY, RUB } = Currencies;
      const totalByEUR = Object.values(products).reduce(
        (acc, { price }) => acc + price,
        0
      );

      try {
        const { rates } = await api.fetchCurrencies(EUR, [GBP, USD, JPY, RUB]);
        const total = getKeys<keyof typeof Currencies, typeof rates>(
          rates
        ).reduce(
          (acc: { [key in Currencies]?: number }, rate) => {
            if (!(rate in acc)) {
              acc[rate] = Number(((acc?.[EUR] ?? 0) * rates[rate]).toFixed(2));
            }

            return acc;
          },
          { [EUR]: totalByEUR }
        );

        setResult(JSON.stringify(total, null, 4));
        console.log(total);
      } catch (error) {
        const message = `[fetchCurrencies]. Error: ${error?.message}.`;
        console.error(error);
        alert(message);
      }
    },
    [result]
  );

  return (
    <>
      <div className="app">
        <div className="app__section app__section_left">
          <Cart calculate={calculate} />
        </div>
        <pre className="app__section app__section_right app__section_relative">
          {result}
          <button onClick={() => setResult('')} disabled={result.length === 0}>
            <span aria-label="Clear result" role="img">
              ❌
            </span>
          </button>
        </pre>
      </div>
      <Info />
    </>
  );
};
