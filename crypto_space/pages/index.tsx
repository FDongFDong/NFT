import Image from 'next/image';

import styled from '@emotion/styled';
import { MenuView, Title } from '../components';
import type { NextPage } from 'next';
import { Button } from '@mui/material';
import Link from 'next/link';
const MainView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled(Button)`
  margin: 4px 0;
`;
const Home: NextPage = () => {
  return (
    <MainView>
      <MenuView>
        <Title>CRYPTO SPACE</Title>
        <Link href="/mint">
          <MenuButton variant="outlined" size="large">
            Minting Your Own Planet
          </MenuButton>
        </Link>
        <MenuButton variant="outlined" size="large">
          View All Planets
        </MenuButton>
      </MenuView>
    </MainView>
  );
};
export default Home;
