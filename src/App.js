import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Redirector from './components/Redirector';
import GetWordContainer from './pages/GetWordContainer/GetWordContainer';
import Home from './pages/Home/Home';
import Saved from './pages/Saved/Saved';
import NotFound from './pages/NotFound';
import InternalServerError from './pages/InternalServerError';
import Offline from './modals/Offline';
import styles from './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusCircle, faMinusCircle);

class App extends Component {


  state = {
    redirect: {},
    word: '',
    info: [],
    partOfSpeech: [],
    versions: [],
    shortdef: "",
    pronunciation: "",
    modal: false,
    faves: [],
    current: {},
  }


  setRedirect = (redirect) =>{
    this.setState({redirect})
  }

  setCurrentState= () =>{
    this.setState({current: {}})
  }

  handleUpdate = values => 
    this.setState({...values})
    

  setModal = modal =>
    this.setState({modal})

  

  handleSave = (word) => {
    this.setState( prevState => {
      const faves = [...prevState.faves];
      const savedIndex = faves.indexOf(word);
      // const test2 = this.state.faves;

     if (savedIndex >= 0) {
        console.log(`Removing ${word.word} from faves...`);
        // console.log("Index position: " + faves.indexOf(word));
        faves.splice(savedIndex, 1); // Remove one word from savedIndex
        this.handleRemove(word);
      } else {
        console.log(`Adding ${word.word} to faves...`);
        faves.push(word);
      }
      // console.log("Index position: " + faves.indexOf(word));
      return {faves};
    });
    // console.log(`faves state: ${this.state.faves}`);
    // console.log(`word state: ${this.state.word}`);
    // console.log(this.state.faves.indexOf(word));
    // this.test();
  }


  handleDetailsClick = (word) => {
    console.log(`Fetching details for ${word.word}`);
    this.setState({ current: word });
  }
  //this might work
  // history.replace({ pathname: currentpath, state: newstate })

  handleRemove = (word) => {
    if (word === this.state.current){
      this.setState({current: {}})
    }    
  }

  setNewCurrent = () => {
    this.setState({current: {}});
  }


render() {
  console.log(`App Current:${this.state.current.word}`);
    return (
      <>
        { this.state.modal === 'offline' ? <Offline closeModal={() => this.setModal(false)} /> : ''}

        <Route 
          render={ routeProps => <Redirector redirect={this.state.redirect} setRedirect={this.setRedirect} {...routeProps} />}
        />
        <header>
          <nav className="navbar">
            <Link  className="navbar-text" to='/'>The Lexicon</Link>
            <Link  className="navbar-text" to='/savedwords'>Saved</Link>
          </nav>
        </header>

        <main>
        <Route
            render = { routeProps =>
              !routeProps.location.state?.alert ? '' :
              <div className="alert alert-primary position-relative float-right m-3">
                { routeProps.location.state.alert }
              </div>
            }
          />
          <Switch>
            <Route exact path="/" render={ routeProps => 
              <Home 
                setRedirect={this.setRedirect} 
                handleUpdate={this.handleUpdate} 
                setModal={this.setModal}
                {...routeProps} />} 
              />
            <Route exact path="/definition/:word" render={routeProps => 
              <GetWordContainer 
                setRedirect={this.setRedirect}
                handleUpdate={this.handleUpdate}
                word={this.state.word}
                info={this.state.info} 
                partOfSpeech={this.state.partOfSpeech}
                versions={this.state.versions}
                shortdef={this.state.shortdef}
                pronunciation={this.state.pronunciation}
                setModal={this.setModal}
                faves={this.state.faves}
                handleSave={this.handleSave}
                {...routeProps} />} 
              />
            <Route exact path="/savedwords" render={routeProps =>
              <Saved 
                setRedirect={this.setRedirect}
                faves={this.state.faves}
                word={this.state.word} 
                current={this.state.current}
                handleSave={this.handleSave} 
                handleDetailsClick={this.handleDetailsClick}
                setNewCurrent={this.setNewCurrent}
                {...routeProps} />}
            />
            <Route path="/404" component={NotFound} />
            <Route path="/500" component={InternalServerError} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }  
}

export default App;






