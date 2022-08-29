import { Share } from 'components/actions';
import Image from 'next/image';
import styled from 'styled-components';

const Header = ({ data }) => {
  const summaryCards = [
    {
      text: 'Parliamentary Constituencies',
      value: `${data['Parliamentary Constituencies']}`,
    },
    {
      text: 'Assembly Constituencies',
      value: `${data['Assembly Constituencies']}`,
    },
    {
      text: 'Population (July 2022) (In Cr.)',
      value: `${data['Population (July 2022) (In Cr.)']}`,
    },
    {
      text: 'Area (In Square KM.)',
      value: `${data['Area (In Square KM.)']}`,
    },
  ];

  return (
    <HeaderWrapper>
      <article>
        {data.State && (
          <figure>
            <Image
              src={`/assets/states/${data.State.toLowerCase()}.svg`}
              width={264}
              height={180}
              alt=""
              className="img-cover"
            />
          </figure>
        )}
        <Main>
          <div>
            <h1 className="gradient-amazon">{data.State}</h1>
            <Share title={data.State} />
          </div>
          <p>{data.Description}</p>
        </Main>
      </article>
      {/* <div>
        <Main>
          <div>
            <h1 className="gradient-amazon">{data.State}</h1>
            <Share title={data.State} />
          </div>
          <p>{data.Description}</p>
        </Main>
      </div> */}
      <Summary>
        <div>
          <h2>
            Summary <span>|</span> Financial Year 2022-23
          </h2>
        </div>
        <ul>
          {summaryCards.map((item, index) => (
            <li key={`summary-${index}`}>
              <div></div>
              <strong>{item.value}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Summary>
    </HeaderWrapper>
  );
};

export default Header;

export const HeaderWrapper = styled.div`
  margin-top: 40px;

  article {
    display: flex;
    text-decoration-color: transparent;
    padding: 8px 8px 16px;
    filter: drop-shadow(var(--box-shadow-1));
    border-radius: 4px;

    figure {
      min-width: 280px;
      flex-grow: 1;
      top: 10px;
      position: sticky;

      @media (max-width: 673px) {
        display: none;
      }
    }
  }
`;

const Main = styled.section`
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    text-transform: capitalize;
  }

  p {
    margin-top: 16px;
    letter-spacing: 0.01em;
  }
`;

export const Summary = styled.div`
  margin-top: 24px;
  padding-bottom: 40px;
  border-bottom: var(--separator-5);

  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    h2,
    span {
      font-weight: 600;
      font-size: 1.5rem;
    }

    h2 {
      line-height: 1;

      @media screen and (max-width: 436px) {
        line-height: 1.7;
        border-right-color: transparent;

        border-bottom: 3px solid var(--text-light-disabled);
        padding-bottom: 12px;
      }
    }
  }

  ul {
    margin-top: 20px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;

    li {
      text-align: center;
      background-color: var(--color-background-lighter);
      padding: 20px 16px;
      border: var(--border-1);
      border-radius: 4px;
      filter: drop-shadow(var(--box-shadow-1));
      flex-basis: 214px;
      flex-grow: 1;
      position: relative;

      > div {
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: var(--gradient-maple);
      }
    }

    strong {
      font-weight: 900;
    }

    span {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light-medium);
      line-height: 1.7;
      margin-top: 4px;
    }
  }
`;
