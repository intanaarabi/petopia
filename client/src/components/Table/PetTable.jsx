

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useState } from 'react';
  
  const PetTable = ({ data, columns }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
      })
  
      const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
          pagination,
        },
      })
  
    return (
      <div className='w-full flex flex-col gap-4'>
        <table className="table-fixed w-full ">
          <thead className="border-b text-left text-xs text-typography-secondary">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} className="font-light py-2">
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-xs" >
            {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => {
                    return (
                    <tr 
                    
                    key={row.id}>
                        {row.getVisibleCells().map(cell => {
                        return (
                            <td key={cell.id} className='pt-4 font-bold'>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                            </td>
                        )
                        })}
                    </tr>
                    )
                })
            ) : (
                <tr>
                    <td colSpan={columns.length} className="text-typography-secondary text-center pt-4">
                    No data available
                    </td>
                </tr>
            )}
           
          </tbody>
        </table>
  
        {/* Pagination Controls */}
        {
            table.getRowModel().rows.length > 0 && (
                <div className='flex flex-row gap-4'>
                <div className='flex-grow'></div>
                <span className="flex items-center gap-1 text-xs">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <div className='text-xs'>
                    <button
                    className="border rounded p-1 disabled:text-typography-secondary"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    {'<<'}
                    </button>
                    <button
                    className="border rounded p-1 disabled:text-typography-secondary"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    {'<'}
                    </button>
                    <button
                    className="border rounded p-1 disabled:text-typography-secondary"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    {'>'}
                    </button>
                    <button
                    className="border rounded p-1 disabled:text-typography-secondary"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    {'>>'}
                    </button>
                </div>
            </div>
            )
        }
       
      </div>
    );
  };
  
  export default PetTable;