import { useMemo } from 'react';
import { PaginationType } from '@/app/types/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const CompaniesTablePagination = ({
  pagination
}: {
  pagination: PaginationType;
}) => {
  const { currentPage, lastPage } = pagination;
  const maxItems = 7;
  const hidden = 2;
  const gap = maxItems - hidden;
  const pages = useMemo(
    () =>
      pagination.pages.reduce((accum: Array<number>, currentValue) => {
        if (lastPage <= maxItems) {
          /*
          Render all pages if number of pages less than maximum number of items
                   _ _ _ _ _ _
          Example: 1 2 3 4 5 6
        */
          accum.push(currentValue);
        } else if (currentValue === 1) {
          /*
          Always print the first page button no matter what
                   _
          Example: 1 2 3 4 5 6 ... 11
        */
          accum.push(currentValue);
        } else if (
          currentValue < currentPage &&
          currentValue >=
            currentPage - Math.max(gap - (lastPage - currentPage), hidden)
        ) {
          if (
            currentValue >= 1 &&
            currentValue + gap <= lastPage &&
            currentPage - hidden >= currentValue &&
            currentPage - gap >= 0
          ) {
            /*
            Prints "..." after page 1 when current page is higher than page 4
                       ___
            Example: 1 ... 7 8 [9] 10 11 ... 50
          */
            accum.push(0); // Use 0 value to show dots instead
          }

          accum.push(currentValue);
        } else if (currentValue > currentPage && currentValue < maxItems) {
          /*
          Prints the first few pages starting from page 1 up to the max number of items minus 1
                   _ _ _ _ _ _
          Example: 1 2 3 4 5 6 ... 20
        */
          accum.push(currentValue);
        } else if (
          currentValue > currentPage &&
          currentValue <=
            currentPage + Math.max(gap - (lastPage - currentPage), hidden)
        ) {
          /*
          Prints the next 2 pages after the current page
                                    __ __
          Example: 1 ... 92 93 [94] 95 96 ... 100
        */
          accum.push(currentValue);
        } else if (currentValue === currentPage) {
          /*
          Prints the current page
                          _
          Example: 1 2 3 [4] 5 6 7
        */
          accum.push(currentValue);
        } else if (currentValue === lastPage) {
          /*
          Prints the last page and include "..." before it
                                     _
          Example: 1 2 3 [4] 5 6 ... 9
        */
          if (currentPage + hidden !== lastPage - 1) {
            accum.push(0);
          }
          accum.push(currentValue);
        }

        return accum;
      }, []),
    [gap, pagination, currentPage, lastPage]
  );

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white py-5'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          className='btn'
          onClick={pagination.prev}
          disabled={pagination.currentPage === 1}
        >
          <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
          Previous
        </button>
        <button
          className='btn'
          onClick={pagination.next}
          disabled={pagination.currentPage >= pagination.lastPage}
        >
          Next
          <ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {pagination.totalRecords > 0 ? pagination.currentRange.start : 0}
            </span>{' '}
            to{' '}
            <span className='font-medium'>{pagination.currentRange.end}</span>{' '}
            of <span className='font-medium'>{pagination.totalRecords}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            aria-label='Pagination'
            className='isolate inline-flex -space-x-px rounded-md'
          >
            <button
              className='btn rounded-r-none'
              onClick={pagination.prev}
              disabled={pagination.currentPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
            </button>
            {pages.map((page, index) =>
              page === 0 ? (
                <span key={index} className='flex items-end px-2 text-gray-400'>
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    pagination.currentPage === page
                      ? 'bg-indigo-600 hover:bg-indigo-600 text-white cursor-default'
                      : ''
                  }`}
                  onClick={() => {
                    if (pagination.currentPage !== page) {
                      pagination.setCurrentPage(page);
                    }
                  }}
                >
                  {page}
                </button>
              )
            )}
            <button
              className='btn rounded-l-none'
              onClick={pagination.next}
              disabled={pagination.currentPage >= pagination.lastPage}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
