'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';

import { ModalType } from '@/app/types/modal';
import { ThreeDots } from 'react-loader-spinner';

const Modal = ({
  data,
  setOpen,
  loading,
  title,
  description,
  actionHandler,
  actionName,
  isDeleteAction = false
}: ModalType) => {
  return (
    <Dialog
      open={data.open}
      onClose={() => {
        if (!loading) {
          setOpen((prev) => ({ ...prev, open: false }));
        }
      }}
      className='relative z-10'
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold text-gray-900'
                  >
                    {title}
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6 justify-center items-center'>
              {loading ? (
                <ThreeDots
                  visible={true}
                  height='36'
                  width='36'
                  color='#4f46e5'
                  radius='9'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClass='test'
                />
              ) : (
                <>
                  <button
                    type='button'
                    onClick={() => actionHandler(data.payload)}
                    className={`btn mt-3 w-full font-bold justify-center sm:mt-0 sm:w-auto sm:ml-3 uppercase ${
                      isDeleteAction
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : ' '
                    }`}
                  >
                    {actionName}
                  </button>
                  <button
                    type='button'
                    data-autofocus
                    onClick={() =>
                      setOpen((prev) => ({ ...prev, open: false }))
                    }
                    className='btn mt-3 w-full justify-center sm:mt-0 sm:w-auto sm:ml-3 sm:mt-0 sm:w-auto uppercase'
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
