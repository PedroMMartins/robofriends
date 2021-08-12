import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

function App() {

    const [robots, setRobots] = useState([]);
    const [searchfield,setSearchField] = useState('');
    const [count,setCount] = useState(0);

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }

    useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(data => data.json())
            .then(d => setRobots(d));

            console.log(count);
    },[count]) //only run if count chamges.

    const filteredRobots = robots.filter(r => r.name.toLowerCase().includes(searchfield.toLowerCase()))
    return robots.lenght === 0 ?
        <h1>Loading</h1>
        :
        (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <button onClick={() => setCount(count +1)}>Click me!</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )


}

export default App;