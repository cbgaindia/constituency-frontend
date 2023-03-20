import { CardsList } from 'components/pages/resources/CardsList';
import { resourcesData } from 'data/resources';
import { GetStaticProps } from 'next';
import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper className="container">
      <h2>Resources</h2>
      <CardsList data={resourcesData} />
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.main`
  min-height: 90vh;
  margin-top: 32px;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.6rem;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'Resources - Constituency Dashboard',
        description: 'Co-created by CBGA and CivicDataLab',
      },
    },
  };
};
