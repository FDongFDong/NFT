import { MenuView, Title } from '@/components';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

const Mint: NextPage = () => {
  return (
    <MainView>
      <MenuView>
        <Title>Mint your own PLANET!</Title>
        <Description>
          You can mint a planet NFT by paying <b>0.01ETH</b>,
          <br />
          You will get a random planet. <br />
          Please press below button to mint!
        </Description>
        <ButtonView>
          <MenuButton variant="contained" size="large">
            Mint Planet
          </MenuButton>
          <MenuButton variant="outlined" size="large">
            Go Previous
          </MenuButton>
        </ButtonView>
      </MenuView>
    </MainView>
  );
};
const ButtonView = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

const MainView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Description = styled.div`
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  font-weigth: 100;
  text-align: center;
`;
const MenuButton = styled(Button)`
  margin: 4px 0;
`;

export default Mint;
