import React, {Component} from 'react';
import MerriamAPI from '../../services/MerriamAPI';
import styles from './WordDetails.module.css';

class WordDetails extends Component {

  state = {
      currentWord: {},
      info: [],
      partOfSpeech: [],
      versions: [],
      shortdef: "",
      pronunciation: "",
      error: '',
  };

componentDidMount() {
      this.props.setNewCurrent()
  }

//   componentDidMount() {
//     console.log("MOUNTED")
//   }

  async componentDidUpdate(prevProps, prevState) {
    const id = this.props.currentWord.word;
    if (id !== prevProps.currentWord.word) {
      const current = await MerriamAPI.getWordInfo(id);
      this.setState({ 
        currentWord: id,
        info: current,
        versions: current[0].meta.stems,
        shortdef: current[0].shortdef[0],
        partOfSpeech: current[0].fl,
        pronunciation: current[0].hwi.prs[0].mw, 
        error: '',
       });
    }
    // console.log(`update state: ${this.state.currentWord.word}`);
    // console.log(this.state.faves);
    // console.log(this.state.faves.some(fave => fave.word === this.state.currentWord))
  }


render(){
    console.log(`Details Current:${this.props.currentWord.word}`);

    let detail; 
    if (this.props.currentWord.word){
        detail = 
        <div className={styles['details-text']}>
            <h2>      
                {this.props.currentWord.word}
            </h2>
            <div>      
                <b>part of speech:</b> {this.state.partOfSpeech}
            </div>
            <div>
                <b>pronunciation:</b> {this.state.pronunciation}
            </div>
            <div>
                <b>definition:</b>  {this.state.shortdef}
            </div>
            <div>
                <b>versions:</b>  {this.state.versions.map((v, i) => <div key={i}>{v}</div>)}
            </div>
        </div>
    }
    else 
        detail = 
            <div>
                <div>No word selected</div>
            </div>
    
    return (
        <div>
            {detail}
        </div>
    );
  } 
};

export default WordDetails;