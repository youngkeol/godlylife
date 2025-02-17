import React, { ReactNode } from 'react';
import classes from './ModalUi.module.css';

const ModalUi = ({children}:{children:ReactNode}) => {
  return (
    <div className={`${classes['modal-wrap']}`}>
      <div  className={`${classes['modal-con-box']}`}>
        {children}
      </div>
  
    </div>
  );
};

export default ModalUi;