import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'components/actions';

const options = [
  {
    value: 'tender_bid_opening_date:asc',
    label: 'Date Asc',
  },
  {
    value: 'tender_bid_opening_date:desc',
    label: 'Date Desc',
  },
  {
    value: 'tender_value_amount:asc',
    label: 'Tender Value Asc',
  },
  {
    value: 'tender_value_amount:desc',
    label: 'Tender Value Desc',
  },
  {
    value: 'buyer_name:asc',
    label: 'Departments',
  },
  {
    value: 'score:desc',
    label: 'Relevance',
  },
];

const Sort: React.FC<{ newSort: any; className?: string }> = ({
  newSort,
  className,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState('tender_bid_opening_date:asc');
  const [value, setValue] = useState('Date Asc');

  useEffect(() => {
    const currentSort = router.query.sort
      ? router.query.sort
      : 'tender_bid_opening_date:asc';

    setSort(currentSort as string);
  }, [router.query.sort]);

  useEffect(() => {
    let currentSort = options.find((o) => o.value === sort);
    currentSort && setValue(currentSort.label);
  }, [sort]);

  const handleChange = (event: any) => {
    setSort(event);

    newSort({
      query: 'sort',
      value: event,
    });
  };
  return (
    <Menu
      options={options}
      heading="Sort by"
      handleChange={handleChange}
      value={value}
      className={className}
    />
  );
};

export default Sort;
