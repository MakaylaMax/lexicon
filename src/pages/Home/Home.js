import React, {Component} from 'react';
import Search from '../../components/Search/Search';
import styles from './Home.module.css';

class Home extends Component {   
 
    render (){
        return (
            <div className={styles['home-background']}>
            <div className={styles['main-header']}>
            <h1 className={styles['first-header']}>The Lexicon</h1>
            <div className={styles['search-box']}>
            <Search 
                theme={'style-home'}
                error={'error-home'}
                handleUpdate={this.props.handleUpdate}
                setRedirect={this.props.setRedirect}
                setModal={this.props.setModal}
            />
            </div>
            </div>
            </div>
        );
    }
}

export default Home;