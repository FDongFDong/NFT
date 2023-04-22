import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

const View = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: #88888820;
  max-width: 500px;
`;
export const MenuView = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <View></View>;
};
