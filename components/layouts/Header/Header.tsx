import Link from 'next/link';
import styled from 'styled-components';

const Header = ({ data }) => {
  return (
    <HeaderWrapper>
      <div className="container">
        {data.previousPage && (
          <Link href={data.previousLink}>
            <a>{`< Go Back to ${data.previousPage}`}</a>
          </Link>
        )}
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        {data.date && <p>{data.date}</p>}
      </div>
    </HeaderWrapper>
  );
};

export default Header;

export const HeaderWrapper = styled.div`
  .container {
    padding-top: 1rem;
    display: block;
    border-bottom: var(--separator-5-2);
  }

  h2 {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.6rem;
    grid-column: 2/3;
    grid-row: 1/2;
    /* word-break: break-all; */
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    grid-column: 2/3;
    grid-row: 2/3;

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }
`;