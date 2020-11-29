import React, {Component} from 'react';
import Search from '../../components/Search/Search';
import MerriamAPI from '../../services/MerriamAPI';
// import '../App.css';
//trying this below
import Fave from '../../components/Fave/Fave';
import styles from './GetWordContainer.module.css';
// import WordRow from '../components/WordRow';


class GetWordContainer extends Component {

state = {
  word: this.props.word,
  info: this.props.info,
  partOfSpeech: this.props.parOfSpeech,
  versions: this.props.versions,
  shortdef: this.props.shortdef,
  pronunciation: this.props.pronunciation,
  faves: this.props.faves, 
  error: '',
}


async componentDidMount() {
  const word = this.props.match.params.word;
  try{
    const data = await MerriamAPI.getWordInfo(word);
    if (data.length && data[0].fl && data[0].meta.stems && data[0].hwi.prs[0].mw && data[0].shortdef[0]) {
      this.setState({
        word: word,
        info: data,
        versions: data[0].meta.stems,
        shortdef: data[0].shortdef[0],
        partOfSpeech: data[0].fl,
        pronunciation: data[0].hwi.prs[0].mw, 
        error: '',
       })
      }
    else {
      console.log("Error")
      this.setState({error:'Word Not Found'})
    }
  }
  catch {
    this.props.setModal('Offline');
  }
  // console.log(`info state: ${this.state.info}`);
  // console.log(`words state: ${this.state.words}`);
}


async componentDidUpdate() {
  const word = this.props.match.params.word;
  if (word !== this.state.word){
    try{
      const data = await MerriamAPI.getWordInfo(word);
      if (data.length && data[0].fl && data[0].meta.stems && data[0].hwi.prs[0].mw && data[0].shortdef[0]) {
        this.setState({
          word: word,
          info: data,
          versions: data[0].meta.stems,
          shortdef: data[0].shortdef[0],
          partOfSpeech: data[0].fl,
          pronunciation: data[0].hwi.prs[0].mw, 
          error: '',
         })
        }
      else {
        // there a lot errors because I didn't make a deep copy somewhere
        // console.log("Error")
        this.setState({error: 'Word Not Found'})
      }
    }
    catch {
      this.props.setModal('Offline');
    }
    }
  }



render (){
  


// const deleteWord = this.props.faves.map(word =>
//   <Fave
//   key={word.word}
//   word={this.state.word}
//   handleSave={() => this.props.handleSave(word)}
//   isFave={(this.props.faves.some(fave => fave.word === this.state.word))} 
//   />
// );


const deleteWord = this.props.faves.filter(word => 
  word.word === this.state.word).map(word => 
    <Fave
    key={word.word}
    word={this.state.word}
    handleSave={() => this.props.handleSave(word)}
    isFave={(this.props.faves.some(fave => fave.word === this.state.word))} 
    />
  );


const saveWord = this.Component = (
  <Fave 
  handleSave={() => this.props.handleSave({
    word: this.state.word,
    info: this.state.info,
    versions: this.state.versions,
    shortdef: this.state.shortdef,
    partOfSpeech: this.state.partOfSpeech,
    pronunciation: this.state.pronunciation, 
  })}
  isFave={(this.props.faves.some(fave => fave.word === this.state.word))}
  />
  );


const test = (this.props.faves.some(fave => fave.word === this.state.word)) ? deleteWord : saveWord;
  

  return (

      <div className={styles['getwordcontainer-background']}>
        {/* <div className="searchWordPage"> */}
        <Search
          input={'input-counter'}
          theme={'style-counter'}
          error={'error-counter'}
          handleUpdate={this.props.handleUpdate}
          setRedirect={this.props.setRedirect}
          setModal={this.props.setModal}
        />
        {this.state.error}
        {/* </div> */}
        <h1 className={styles['main-header']}>
          {this.state.word} {test}
        </h1>
        <div className={styles['container']}>
        <div className={styles['container-child']}>
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
        </div>
      </div>
  );
  }
}

 export default GetWordContainer;
  

