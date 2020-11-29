import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Fave.module.css';

const Fave = (props) => {

  const handleClick = (e) => {
    e.stopPropagation();
    props.handleSave();
  }

  // const isFave = props.isFave ? 'remove_from_queue' : 'add_to_queue';
  const isFave = props.isFave ? <FontAwesomeIcon icon="minus-circle" />  : <FontAwesomeIcon icon="plus-circle" /> ;

  return (
    <div  onClick={handleClick}>
      <p className={styles['fave-button']}>{isFave}</p>
    </div>
  );
};

export default Fave;