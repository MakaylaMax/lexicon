import React from 'react';
import styles from './WordRow.module.css'
//trying this below
import Fave from '../Fave/Fave';



const WordRow = (props) => {


  return (
    <div onClick={() => props.onDetailsClick(props.word)} >
        <div className={styles['WordRow1']}>{props.word.word}</div>
        <div className={styles['WordRow2']}><Fave isFave={props.isFave} handleSave={props.handleSave} /></div>
    </div>
  );
};

export default WordRow;
