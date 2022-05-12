import { Share } from 'components/actions';
import Image from 'next/image';
import styled from 'styled-components';

const Header = ({ data }) => {
  const summaryCards = [
    {
      text: 'Total Receipts',
      value: `₹ ${data['Total Receipts']} Cr.`,
    },
    {
      text: 'Total Expenditure',
      value: `₹ ${data['Total Expenditure']} Cr.`,
    },
    {
      text: 'Fiscal Deficit',
      value: `₹ ${data['Fiscal Deficit']} Cr.`,
    },
    {
      text: 'GSDP (in current prices)',
      value: `₹ ${data['GSDP']} Cr.`,
    },
  ];

  return (
    <HeaderWrapper>
      <article>
        {data.State && (
          <Image
            src={`/assets/states/${data.State.toLowerCase()}.svg`}
            width={264}
            height={180}
            alt=""
            className="img-cover"
          />
        )}

        <CardContent>
          <div>
            <p>
              Lok Sabha:
              <span>{data['Lok Sabha']}</span>
            </p>
            <p>
              Vidhan Sabha:
              <span>{data['Vidhan Sabha']}</span>
            </p>
          </div>
          <p>
            Population (2011):
            <span>{data['Population (2011)']} Cr</span>
          </p>
          <p>
            Area:
            <span>
              {data.Area} km<sup>2</sup>
            </span>
          </p>
        </CardContent>
      </article>
      <div>
        <Main>
          <div>
            <h1 className="gradient-amazon">{data.State}</h1>
            <Share title={data.State} />
          </div>
          <p>{data.Description}</p>
        </Main>
        <Summary>
          <div>
            <h2>Budget 2022-23 Highlights</h2>
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
