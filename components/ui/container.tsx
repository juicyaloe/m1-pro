import styled from '@emotion/styled';

const Container = styled.div`
  width: 70%;
  max-width: 1000px;
  margin: 0 auto;

  @media screen and (width < 632px) {
    width: 90%;
  }
`;

export { Container };
