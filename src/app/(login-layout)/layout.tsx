import React, { ReactNode } from 'react';

const DefaultLayout = ({children}: {children:ReactNode}) => {
  return (
    <div className='wrapper login-wrapper'>
      <div className='contents login-contents'>
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;