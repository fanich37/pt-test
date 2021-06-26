import { Currencies, MINUTE } from './constants';

const REACT_APP_API_ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY;

type FetchCurrenciesResponse = {
  success: boolean;
  timestamp: number;
  date: string;
  rates: Record<keyof typeof Currencies, number>;
};

class API {
  private static cache: {
    timestamp: number | null;
    response: FetchCurrenciesResponse | null;
  } = {
    timestamp: null,
    response: null,
  };

  public fetchCurrencies = async (
    base: keyof typeof Currencies,
    listOfTickets: Array<keyof typeof Currencies>
  ): Promise<FetchCurrenciesResponse> => {
    if (!REACT_APP_API_ACCESS_KEY) {
      throw Error('The api access key is missing.');
    }

    const tickets = listOfTickets.join(',');
    const { response, timestamp } = API.cache;

    if (timestamp && Date.now() - timestamp <= MINUTE && response) {
      return response;
    }

    try {
      const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${REACT_APP_API_ACCESS_KEY}&base=${base}&symbols=${tickets}`
      );
      const json = await response.json();

      if (json.success === false) {
        throw new Error(JSON.stringify(json.error));
      }

      API.cache.response = json;
      API.cache.timestamp = Date.now();

      return json;
    } catch (error) {
      throw new Error(`[fetchCurrencies]. Error: ${error?.message}.`);
    }
  };
}

export const api = new API();
