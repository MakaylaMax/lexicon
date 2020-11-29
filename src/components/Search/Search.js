import React, {Component} from 'react';
import MerriamAPI from '../../services/MerriamAPI';
import styles from './Search.module.css';

class Search extends Component {


  state = {
    word:'',
    error: '',
  };


handleChange = (event) => {
this.setState({word:event.target.value.toLowerCase()});
}


handleSubmit = (e) => {
  e.preventDefault();
  this.search(this.state.word)
  this.setState({word: ''});
  this.setState({error: ''});

}


search = async (word) => {

  try{
      const data = await MerriamAPI.getWordInfo(word);
      // console.log(data);
      //&& word exists 
      if (data.length && data[0].fl && data[0].meta.stems && data[0].hwi.prs[0].mw && data[0].shortdef[0]){
          // console.log('A HERE')
          this.props.handleUpdate({
              word: word,
              info: data,
              versions: data[0].meta.stems,
              shortdef: data[0].shortdef[0],
              partOfSpeech: data[0].fl,
              pronunciation: data[0].hwi.prs[0].mw, 
          });
          this.props.setRedirect({
              path: `/definition/${word}`,
          });
      }
        else {
          // console.log('B HERE')
          this.setState({error: 'Word Not Found'});
          console.log(this.state.error)
      }
  }
  catch{
      this.props.setModal('Offline')
  }
}



render (){
  return (
    <div> 
    <form className={styles['search-text']} onSubmit={this.handleSubmit}>
    <div className={styles[this.props.input]}>
      <br />
      <div>
      <input type="text" onChange={this.handleChange} value={this.state.word} />
      </div>
      <br />
      <div>
      <button className={styles[this.props.theme]} type="submit">search</button>
      </div>
      </div>
      <div className={styles[this.props.error]}>
        {this.state.error}
      </div>
    </form>
    </div>
  );
}
}

export default Search;
