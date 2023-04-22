import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import { MenuView } from '@/components/MenuView';
const inter = Inter({ subsets: ['latin'] });

const ManiView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <ManiView>
      <MenuView>asdf</MenuView>
    </ManiView>
  );
}
