import { Button, ProgressBar } from '@opub-cdl/design-system';
import { Notice } from 'components/icons';
import Image from 'next/image';
import styled from 'styled-components';

const SnapshotCard = ({
  data,
}: {
  data: {
    img: string;
    title: string;
    value?: {
      state: number;
      constituency: number;
    };
  };
}) => {
  return (
    <SnapshotSchemeCard key={data.title}>
      <CardTitle>
        <figure>
          <Image
            src={data.img ? data.img : '/assets/images/placeholder.jpg'}
            width={72}
            height={72}
            layout="fixed"
            alt=""
            className="img-cover"
          />
        </figure>

        <h5>{data.title}</h5>
      </CardTitle>
      <Separator role="none" />
      {data.value ? (
        <>
          <SnapshotSchemeBar>
            <div>
              <span>State Average</span>
              <ProgressBar data-fill="pink" value={data.value.state} />
            </div>
            <div>
              <span>Constituency</span>
              <ProgressBar data-fill="teal" value={data.value.constituency} />
            </div>
          </SnapshotSchemeBar>
          <Button variant={'secondary-outline'}>Explore More</Button>
        </>
      ) : (
        <>
          <NoSchemeData>
            <Notice fill="#E9B840" width={48} />
            <p>
              The data is not available for the selected indicator and fiscal
              year!
            </p>
          </NoSchemeData>
          <Button variant={'secondary-outline'}>Explore Other Data</Button>
        </>
      )}
    </SnapshotSchemeCard>
  );
};

export default SnapshotCard;

const SnapshotSchemeCard = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;

  padding: 16px;
  background-color: var(--color-background-lighter);
  border-radius: 4px;

  @media (max-width: 520px) {
    > button {
      flex-grow: 1;
    }
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-basis: 288px;

  > figure {
    width: 72px;
    height: 72px;
    display: block;
  }

  h5 {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.7;
  }
`;

const Separator = styled.span`
  background-color: var(--color-grey-500);
  height: 48px;
  width: 1px;

  @media (max-width: 1086px) and (min-width: 980px) {
    display: none;
  }
  @media (max-width: 741px) {
    display: none;
  }
`;

const SnapshotSchemeBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-basis: 330px;
  flex-grow: 1;

  > div {
    display: flex;
    align-items: center;
    gap: 20px;

    > span {
      font-size: 0.75rem;
      line-height: 1.7;
      color: var(--text-light-medium);
      font-weight: 600;
      flex-basis: 26%;
    }

    [role='progressbar'] {
      --sizes-1: 8px;
      --radii-pill: 0;
      --colors-slate4: var(--color-grey-600);
      flex-grow: 1;
    }

    [data-fill='pink'] {
      --colors-slate8: #de7992;
    }

    [data-fill='teal'] {
      --colors-slate8: #4abebe;
    }
  }
`;

const NoSchemeData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-light-medium);
  line-height: 1.3;
  font-weight: 500;

  flex-basis: 287px;
  flex-grow: 1;

  svg {
    min-width: 48px;
  }
`;