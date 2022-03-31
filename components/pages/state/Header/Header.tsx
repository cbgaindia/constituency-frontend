import Image from 'next/image';
import styled from 'styled-components';

const summaryCards = [
  {
    text: 'Total Receipts',
    value: '₹ 4,20,672 Cr.',
  },
  {
    text: 'Total Expenditure',
    value: '₹ 5,50,271 Cr.',
  },
  {
    text: 'Fiscal Deficit',
    value: '₹ 21,73,990 Cr.',
  },
  {
    text: 'GSDP',
    value: '₹ 21,73,990 Cr.',
  },
];

const Header = ({ data }) => {
  return (
    <HeaderWrapper>
      <article>
        <Image
          src={'/assets/states/up.svg'}
          width={264}
          height={180}
          alt=""
          className="img-cover"
        />
        <CardContent>
          <div>
            <p>
              Lok Sabha:
              <span>73</span>
            </p>
            <p>
              Vidhan Sabha:
              <span>26</span>
            </p>
          </div>
          <p>
            Population (2011):
            <span>199,812,341</span>
          </p>
          <p>
            Area:
            <span>
              240,928 km<sup>2</sup>
            </span>
          </p>
        </CardContent>
      </article>
      <div>
        <Main>
          <h1 className="gradient-amazon">{data.title}</h1>
          <p>{data.content}</p>
        </Main>
        <Summary>
          <div>
            <h2>Summary</h2>
            <span>Financial Year 2022-23</span>
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
      </div>
    </HeaderWrapper>
  );
};

export default Header;

export const HeaderWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;

  article {
    flex-basis: 280px;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    text-decoration-color: transparent;
    background-color: var(--color-background-lighter);
    padding: 8px 8px 16px;
    filter: drop-shadow(var(--box-shadow-1));
    border-radius: 4px;
  }

  > div {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
  }
`;

const CardContent = styled.div`
  margin-top: 18px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  > *:not(:last-child) {
    border-bottom: var(--separator-5);
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  p {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.75rem;
    line-height: 2;
  }

  span {
    font-weight: 600;
  }
`;

const Main = styled.section`
  padding-bottom: 24px;
  border-bottom: var(--separator-5);

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    margin-top: 16px;
    letter-spacing: 0.01em;
  }
`;

const Summary = styled.div`
  margin-top: 24px;

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
      border-right: 3px solid var(--text-light-disabled);
      padding-right: 12px;
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
