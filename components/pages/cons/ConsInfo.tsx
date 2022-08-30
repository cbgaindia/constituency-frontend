import Image from 'next/image';
import styled from 'styled-components';

const ConsInfo = ({ data, queryData }) => {
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
              src={`/assets/states/${data.State.toLowerCase()}.jpg`}
              width={144}
              height={144}
              alt=""
              className="img-cover"
            />
          </figure>
        )}
        <Main>
          <div>
            <h2>About {queryData.cons}</h2>
          </div>
          <p>{data.Description}</p>
        </Main>
      </article>
      <Summary>
        <div>
          <h3>Demographic Highlights</h3>
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
      <SnapshotTitle>Scheme Performance Snapshots</SnapshotTitle>
    </HeaderWrapper>
  );
};

export { ConsInfo };

export const HeaderWrapper = styled.div`
  margin-top: 40px;

  article {
    display: flex;
    gap: 32px;
    align-items: flex-start;

    figure {
      display: inline-block;
      min-width: 160px;
      /* flex-grow: 1; */
      top: 10px;
      position: sticky;

      padding: 8px;
      filter: drop-shadow(var(--box-shadow-1));
      border-radius: 4px;
      background-color: var(--color-background-lighter);
      font-size: 0;

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
    gap: 8px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.24;
    text-transform: capitalize;
  }

  p {
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

    h3 {
      line-height: 1.5;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-light-medium);
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

const SnapshotTitle = styled.h3`
  font-size: 2rem;
  line-height: 1.24;
  font-weight: 700;
  margin-top: 32px;
`;
