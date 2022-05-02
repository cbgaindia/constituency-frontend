import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination, useSortBy } from 'react-table';
import { ArrowDown, SortIcon } from 'components/icons';
import { truncate } from 'utils/helper';
import { Button, Menu } from 'components/actions';
import PaginationComp, {
  ButtonsLabel,
  PaginationButtons,
  PaginationJump,
} from '../Pagination/PaginationComp';
import {
  MenuButton,
  MenuContent,
  MenuLabel,
} from 'components/actions/Menu/MenuComp';

const paginationItems = [
  {
    title: '10',
    value: '10',
  },
  {
    title: '20',
    value: '20',
  },
  {
    title: '50',
    value: '50',
  },
];

const ReactTable = ({ columns, data }) => {
  const [totalRows, setTotalRows] = useState('10');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  console.log('totalRows', totalRows);

  return (
    <Wrapper>
      <TableWrapper {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              key={`table-tr-${index}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, j) => (
                <th
                  key={`table-th-${j}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}{' '}
                  <Button
                    // icon={<SortIcon fill="#000000" />}
                    icon={
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDown fill="#000000" />
                        ) : (
                          <ArrowDown
                            fill="#000000"
                            style={{ transform: 'rotate(180deg)' }}
                          />
                        )
                      ) : (
                        <SortIcon fill="#000000" />
                      )
                    }
                    iconOnly
                    kind="custom"
                  >
                    Sort
                  </Button>
                </th>
              ))}
            </tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={`table-tr1-${i}`} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return (
                    <td key={`table-td-${j}`} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </TBody>
      </TableWrapper>
      <PaginationComp className="pagination">
        <Menu
          options={paginationItems}
          heading="Rows:"
          handleChange={(e) => {
            setTotalRows(e);
            setPageSize(Number(e));
          }}
          value={totalRows}
          top={true}
          position="left"
        />

        <PaginationJump>
          <label className="label-green" htmlFor="jumpNumber">
            Jump to: &nbsp;
            <input
              type="text"
              id="jumpNumber"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </label>
        </PaginationJump>

        <PaginationButtons>
          <ButtonsLabel>
            Page No. {<span>{pageIndex + 1}</span>} of{' '}
            {<span>{pageOptions.length}</span>}
          </ButtonsLabel>
          <div>
            <Button
              onClick={() => previousPage()}
              kind="custom"
              className="pagination__back"
              icon={<ArrowDown />}
              iconOnly={true}
            >
              Previous Page
            </Button>
            <Button
              onClick={() => nextPage()}
              className="pagination__next"
              icon={<ArrowDown />}
              iconOnly={true}
            >
              Next Page
            </Button>
          </div>
        </PaginationButtons>
      </PaginationComp>
    </Wrapper>
  );
};

const Table = ({ rows, header }) => {
  const columns = useMemo(() => header, [header]);
  const data = useMemo(() => rows, [rows]);

  return columns.length ? <ReactTable columns={columns} data={data} /> : <></>;
};

export default Table;

const Wrapper = styled.div`
  ${PaginationComp} {
    position: sticky;
    bottom: 0;
    border-top: var(--border-1);
    border-radius: 0;
    padding-bottom: 0;
  }

  ${MenuLabel} {
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: var(--font-weight-medium);
  }

  ${MenuButton} {
    min-width: 80px;
  }

  ${MenuContent} {
    max-width: 80px;
  }
`;

export const TableWrapper = styled.table`
  border-collapse: collapse;
  line-height: 1.38;
  width: 100%;
  min-height: 494px;

  th,
  td {
    padding: 8px 12px;
    text-align: left;
  }

  caption {
    margin-bottom: 8px;
    font-style: italic;
    text-align: left;
  }
`;

const THead = styled.thead`
  position: sticky;
  top: 0;
  background-color: var(--color-grey-600);
  border-radius: 4px;
  display: block;

  tr {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  th {
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const TBody = styled.tbody`
  display: block;

  tr {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 100%;

    &:not(:last-child) {
      border-bottom: var(--border-2);
    }
  }
`;
