import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import {
  TrashIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Types
import { CompaniesType, SelectedCompaniesType } from '@/app/types/company';
import { ModalDataType, ModalType } from '@/app/types/modal';
import Modal from '../Modal/Modal';
import { PaginationType } from '@/app/types/pagination';

const CompaniesTable = ({
  data,
  selectedCompanies,
  setSelectedCompanies,
  pagination
}: {
  data: CompaniesType;
  selectedCompanies: SelectedCompaniesType;
  setSelectedCompanies: Dispatch<SetStateAction<SelectedCompaniesType>>;
  pagination: PaginationType;
}) => {
  const [modal, setModal] = useState<ModalDataType>({
    open: false,
    payload: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRemoveButton = useCallback((id: number) => {
    setModal({ open: true, payload: { id } });
  }, []);

  const handleRemove = useCallback(
    async (payload: { id: number }) => {
      // Set payload as array of a single ID since the API supports multiple IDs.
      const newPayload = [payload.id];

      setLoading(true);

      try {
        const res = await fetch('/api/companies/', {
          method: 'DELETE',
          body: JSON.stringify(newPayload)
        });
        const json = await res.json();

        if (json.success) {
          setModal((prev) => ({ ...prev, open: false }));
          setSelectedCompanies((prev) =>
            prev.filter((companyId) => companyId !== payload.id)
          );

          pagination.refreshData();
        } else {
          setError(json.message);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    },
    [pagination, setSelectedCompanies]
  );

  const handleOnCheckboxChange = useCallback(
    (id: number) => {
      const checked = selectedCompanies.includes(id);

      if (checked) {
        const newSelectedCompanies = selectedCompanies.filter(
          (companyId) => companyId !== id
        );

        setSelectedCompanies(newSelectedCompanies);
      } else {
        const newSelectedCompanies = [...selectedCompanies, id];

        setSelectedCompanies(newSelectedCompanies);
      }
    },
    [selectedCompanies, setSelectedCompanies]
  );

  const handleOnSelectAllCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      setSelectedCompanies((prev) => {
        if (checked) {
          return [...prev, ...data.map((company) => company.id)];
        } else {
          return [
            ...prev.filter((id) => !!data.find((company) => company.id === id))
          ];
        }
      });
    },
    [data, setSelectedCompanies]
  );

  const isCompanySelected = useCallback(
    (id: number): boolean => {
      const company = selectedCompanies.includes(id);

      return company;
    },
    [selectedCompanies]
  );

  const checkboxAllChecked =
    data.filter((company) => selectedCompanies.includes(company.id)).length ===
    data.length;

  return (
    <div className='relative sm:rounded-lg'>
      <Modal
        data={modal}
        setOpen={setModal}
        loading={loading}
        title={'Remove item'}
        description={'Are you sure you want to remove this company?'}
        actionHandler={handleRemove}
        actionName={'Remove'}
        isDeleteAction={true}
      />
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className=''
                  onChange={handleOnSelectAllCheckbox}
                  checked={checkboxAllChecked}
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Company Name
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='overflow-auto max-h-screen'>
          {data.map((company) => (
            <tr
              key={company.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-search-1'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={() => handleOnCheckboxChange(company.id)}
                    checked={isCompanySelected(company.id)}
                  />

                  <label htmlFor='checkbox-table-search-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <td
                scope='row'
                className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
              >
                {company.id}
              </td>
              <td className='px-6 py-4 text-gray-900 dark:text-white'>
                {company.name}
              </td>
              <td className='flex items-center justify-center px-6 py-4'>
                <button
                  className='font-medium hover:text-red-600 hover:dark:text-red-500'
                  onClick={() => handleRemoveButton(company.id)}
                  title='Remove this company'
                >
                  <div className='flex'>
                    <TrashIcon className='h-5 w-5' />
                    <span className='sr-only'>Remove</span>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} />
    </div>
  );
};

const Pagination = ({ pagination }: { pagination: PaginationType }) => {
  const { pages } = pagination;
  const maxNumberOfPagesShown = 10;

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          className='btn'
          onClick={pagination.prev}
          disabled={pagination.currentPage === 1}
        >
          Previous
        </button>
        <button
          className='btn'
          onClick={pagination.next}
          disabled={pagination.currentPage >= pagination.lastPage}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>{pagination.currentRange.start}</span>{' '}
            to{' '}
            <span className='font-medium'>{pagination.currentRange.end}</span>{' '}
            of <span className='font-medium'>{pagination.totalRecords}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            aria-label='Pagination'
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
          >
            <button
              className='btn'
              onClick={pagination.prev}
              disabled={pagination.currentPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
            </button>
            {pages.length <= maxNumberOfPagesShown &&
              pages.map((page) =>
                page === 0 ? (
                  <span key={page} className=''>
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
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
              className='btn'
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

export default CompaniesTable;
