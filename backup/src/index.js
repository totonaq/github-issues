import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './Issues';
import { HashRouter } from 'react-router-dom';

const App = () => {
	return (
		<HashRouter>
       <Issues />   
    </HashRouter>
		
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
