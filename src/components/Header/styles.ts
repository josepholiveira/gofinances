import styled from 'styled-components';

interface HeaderProps {
  size?: 'small' | 'large';
}

export const Container = styled.div`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }: HeaderProps): string =>
      size === 'small' ? '0 20px ' : '0 20px 150px'};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;

        & + a {
          margin-left: 32px;
        }
      }
    }
  }
`;
