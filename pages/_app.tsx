import Head from 'next/head';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';

import themes from '@styles/themes/themes';
import GlobalStyle from '@styles/globalstyles/GlobalStyle';
import Layout from '@components/layout/Layout';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>개미는 툰툰</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={themes}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
