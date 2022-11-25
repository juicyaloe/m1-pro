import styled from '@emotion/styled';
import { Container } from '../ui';
import { useRouter } from 'next/router';

const NavContainer = styled(Container)`
  background-color: rgb(216, 255, 216);

  border-radius: 0px 0px 10px 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const NavComp = styled.div`
  display: inline-block;

  font-size: 20px;
  font-weight: bold;

  padding: 5px 15px;
  margin: 7px 0px;

  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    border-radius: 3px;
    border: 1px solid black;
  }

  &:active {
    background-color: white;
  }
`;

export default function Navbar() {
  const router = useRouter();

  return (
    <NavContainer>
      <NavComp onClick={() => router.push('/')}>홈 화면</NavComp>
      <NavComp onClick={() => router.push('/error/')}>temp</NavComp>
    </NavContainer>
  );
}
