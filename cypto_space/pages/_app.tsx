import { Space } from '../components/Space/Space';
import '@/styles/globals.css';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SpaceWrapper>
        <Space />
      </SpaceWrapper>

      <ComponentWrapper>
        <Component {...pageProps} />
      </ComponentWrapper>
    </>
  );
}
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
  overflow: auto;
`;
export default App;
