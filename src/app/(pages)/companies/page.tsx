'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowPathIcon,
  TrashIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Skeleton from 'react-loading-skeleton';

// Components
import CompaniesTable from '@/app/components/Companies/CompaniesTable';
import Modal from '@/app/components/Modal/Modal';

// Hooks
import { useFetchCompaniesData } from '@/app/hooks/useFetchCompaniesData';

// Types
import { SelectedCompaniesType } from '@/app/types/company';
import { ModalDataType } from '@/app/types/modal';

const Companies: React.FC = () => {
  const [generateLoading, setGenerateLoading] = useState<boolean>(false);
  const [removeError, setRemoveError] = useState<string>('');
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalRemoveSelected, setModalRemoveSelected] = useState<ModalDataType>(
    {
      open: false,
      payload: null
    }
  );
  const [selectedCompanies, setSelectedCompanies] =
    useState<SelectedCompaniesType>([]);

  const { loading, data, setData, error, refetch, pagination } =
    useFetchCompaniesData();

  const handleRemoveSelectedButton = useCallback(() => {
    setModalRemoveSelected((prev) => ({ ...prev, open: true }));
  }, []);

  const handleRemoveSelected = useCallback(async () => {
    setModalLoading(true);

    try {
      const response = await fetch('/api/companies', {
        method: 'DELETE',
        body: JSON.stringify(selectedCompanies)
      });
      const result = await response.json();

      if (result.success) {
        setModalRemoveSelected((prev) => ({ ...prev, open: false }));
        setSelectedCompanies([]);
        setModalLoading(false);

        pagination.refreshData();
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.error(error);
      setRemoveError(error);
    }
  }, [selectedCompanies, pagination]);

  const handleGenerate = useCallback(async () => {
    setGenerateLoading(true);

    try {
      const generate = await fetch('/api/companies/generate');
      const result = await generate.json();

      if (result.success) {
        await pagination.refreshData();
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.error(error);
    } finally {
      setGenerateLoading(false);
    }
  }, [pagination]);

  if (error) {
    return (
      <div className='flex h-full justify-center items-center text-center flex-col'>
        <ExclamationTriangleIcon className='h-20 w-20 text-gray-200' />
        <span className='text-gray-500'>Oops, something went wrong.</span>
      </div>
    );
  }

  return (
    <div>
      <Modal
        data={modalRemoveSelected}
        setOpen={setModalRemoveSelected}
        title={'Remove Selected Items'}
        description={`Are you sure you want to remove ${selectedCompanies.length} selected item(s)? This action cannot be undone.`}
        actionHandler={handleRemoveSelected}
        actionName={'Yes, Remove Selected Items'}
        isDeleteAction={true}
        loading={modalLoading}
      />
      <div className='flex lg:items-center lg:justify-between mb-10'>
        <div className='min-w-0 flex-1 mr-5'>
          <h2 className='text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Companies
          </h2>
          <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              A list of all companies tracking your personal data in your
              browser.
            </div>
          </div>
        </div>
        <div className='mt-5 flex lg:ml-4 lg:mt-0'>
          <span className='hidden sm:block'>
            <button
              type='button'
              className='btn'
              onClick={handleGenerate}
              disabled={loading || generateLoading}
            >
              <ArrowPathIcon
                aria-hidden='true'
                className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
              />
              {generateLoading ? 'Generating...' : 'Generate Data'}
            </button>
          </span>

          <span className='sm:ml-3 hidden sm:block'>
            <button
              type='button'
              className='btn'
              onClick={handleRemoveSelectedButton}
              disabled={loading || selectedCompanies.length === 0}
            >
              <TrashIcon
                aria-hidden='true'
                className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
              />
              Remove Selection&nbsp;
              {selectedCompanies.length > 0 &&
                `(${selectedCompanies.length})`}{' '}
            </button>
          </span>

          {/* Dropdown */}
          <Menu as='div' className='relative sm:hidden'>
            <MenuButton className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400'>
              <WrenchScrewdriverIcon className='h-5 w-5 mr-2 text-gray-400' />
              Actions
              <ChevronDownIcon
                aria-hidden='true'
                className='-mr-1 ml-1.5 h-5 w-5 text-gray-400'
              />
            </MenuButton>

            <MenuItems
              transition
              className='absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
            >
              <MenuItem>
                <button
                  className='block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left'
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <ArrowPathIcon
                    aria-hidden='true'
                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400 inline'
                  />
                  Refresh
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className='block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left'
                  onClick={handleRemoveSelectedButton}
                  disabled={loading || selectedCompanies.length === 0}
                >
                  <TrashIcon
                    aria-hidden='true'
                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400 inline'
                  />
                  Remove&nbsp;
                  {selectedCompanies.length > 0 &&
                    `(${selectedCompanies.length})`}{' '}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className=''>
        {loading ? (
          <CompaniesLoadingSkeleton count={pagination.resultsPerPage} />
        ) : (
          <CompaniesTable
            data={data}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            pagination={pagination}
          />
        )}
      </div>
    </div>
  );
};

const CompaniesLoadingSkeleton = ({
  count,
  height = 40
}: {
  count: number;
  height?: number;
}) => {
  return (
    <div>
      {Array.from(Array(count), (_, i) => (
        <Skeleton key={i} height={height} className='mb-5' />
      ))}
    </div>
  );
};

export default Companies;
