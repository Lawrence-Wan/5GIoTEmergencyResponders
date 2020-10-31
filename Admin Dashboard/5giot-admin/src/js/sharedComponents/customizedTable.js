import React from "react";
import {
  useTable,
  useSortBy,
  usePagination /*useRowSelect */,
} from "react-table";
import { Col } from "react-bootstrap";
import styled from "styled-components";
const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #a9a3a3;
    line-height: 1.6;
    font-size: 14px;
    color: black;
    font-weight: 300;
    overflow-x: hidden;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      height: 60px;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #a9a3a3;
      border-right: 1px solid #a9a3a3;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 1rem;
  }
`;
export default function CustomizedTable({
  columns,
  data,
  tHeadStyle,
  minPageSize,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    /*rows,*/
    canPreviousPage,
    canNextPage,
    /*pageOptions,*/
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    /* selectedFlatRows,*/

    state: { /*pageIndex,*/ pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: minPageSize },
    },
    useSortBy,
    usePagination
  );
  /* useEffect(() => {
    onSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);*/
  return (
    <>
      <Styles>
        <table {...getTableProps()}>
          <thead style={tHeadStyle}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} style={{ overflow: "scroll" }}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination" style={{ marginTop: "10px" }}>
          <div>
            {" "}
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>{" "}
          {/*   <div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </div>*/}
          <Col>
            {/*<span style={{ float: "right", marginLeft: "10px" }}>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
              */}
            <select
              style={{ float: "right" }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[minPageSize, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        </div>
      </Styles>
    </>
  );
}
