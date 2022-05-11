import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const SchemeList = ({ data, state }) => {
  return (
    <Wrapper>
      <span className="gradient-maple">Drilldown Further</span>
      <h2>Explore fiscal information for the following Schemes</h2>
      <ul>
        {data.map((item, index) => (
          <Card key={`schemeList-${index}`}>
            <Link href={`/explorer?scheme=${item.scheme_slug}&state=${state}`}>
              <a>
                <figure>
                  <Image
                    src={'/assets/schemes/nhm.png'}
                    alt=""
                    width={88}
                    height={88}
                    className="img-contain"
                  />
                </figure>
                <h3>{item.scheme_name}</h3>
              </a>
            </Link>
          </Card>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SchemeList;

const Wrapper = styled.div`
  margin-top: 80px;

  > span {
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.7;
  }

  > h2 {
    font-weight: 600;
    line-height: 1.24;
    font-size: 2rem;
    margin-top: 8px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 40px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  }
`;

const Card = styled.li`
  a {
    background-color: var(--color-background-lighter);
    padding: 8px 8px 16px;
    min-height: 224px;
    border-radius: 4px;
    box-shadow: var(--box-shadow-1);
    display: block;
    text-decoration-color: transparent;
    transition: box-shadow 200ms ease-in-out,
      text-decoration-color 200ms ease-in-out;

    &:hover {
      box-shadow: var(--box-shadow-hover);
      text-decoration-color: currentColor;
    }
  }

  figure {
    background-color: var(--color-grey-600);
    display: grid;
    place-content: center;
    padding-block: 12px;
  }

  h3 {
    font-weight: 600;
    text-align: center;
    font-size: 1rem;
    margin-top: 16px;
  }
`;
