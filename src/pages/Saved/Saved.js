import React, {Component} from 'react';
import WordRow from '../../components/WordRow/WordRow';
import styles from './Saved.module.css';
import WordDetails from '../../components/WordDetails/WordDetails';

class Saved extends Component {


  handleDetailsTrigger = word => {
    this.props.handleDetailsClick(word)
  }


    render (){
    console.log(`SAVED FAVES: ${(this.props.faves.some(fave => fave.word === fave.word))}`);

        const allWords = this.props.faves.map(word =>
            <WordRow
                key={word.word}
                word={word}
                // isFave={this.props.faves.word=(this.props.word)}
                isFave={(this.props.faves.some(fave => fave.word === fave.word))}
                handleSave={() => this.props.handleSave(word)}
                onDetailsClick={() => this.handleDetailsTrigger(word)}
            />
        );
        

        return (
            <div className={styles['saved-background']}>
            <div className={styles['saved-flex-container']}>
            <div>
            <h2 className={styles['first-header']}>My Saved Words: {this.props.faves.length}</h2>
            {allWords}
            </div>
            <div className={styles['details-background']}>
            <WordDetails setNewCurrent={this.props.setNewCurrent} currentWord={this.props.current} />
            </div>
            </div>
            </div>
        );
    }
}

export default Saved;