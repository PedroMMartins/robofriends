import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        };
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    componentDidMount() {        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((data) => {
                return data.json();
            })
            .then(d => {
                this.setState({ robots: d });
            })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(r => r.name.toLowerCase().includes(searchfield.toLowerCase()))
        return robots.lenght === 0 ?
            <h1>Loading</h1>
            :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )

    }
}

export default App;