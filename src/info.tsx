import { memo } from 'react';

export const Info = memo(() => (
  <>
    <p className="info">
      The API I use can't handle USD as a base currency - it's blocked. So I use
      EUR as a default.
    </p>
    <p className="info">
      The source code can be found{' '}
      <a
        href="https://github.com/fanich37/pt-test"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
    </p>
  </>
));
