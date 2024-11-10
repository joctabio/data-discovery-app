import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-white rounded-xl px-5 py-5 shadow-sm'>{children}</div>
  );
};

export default Card;
