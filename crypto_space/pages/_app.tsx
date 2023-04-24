import { SpaceContextProvider } from '@/contexts/useSpace';
import { Space } from '../components';
import '../styles/globals.css';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <SpaceContextProvider>
      <AppView>
        <SpaceWrapper>
          <Space />
        </SpaceWrapper>

        <ComponentWrapper>
          <Component {...pageProps} />
        </ComponentWrapper>
      </AppView>
    </SpaceContextProvider>
  );
}

const AppView = styled.div`
  width: 100%;
  height: 100%;
`;

const SpaceWrapper = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;
export default App;
