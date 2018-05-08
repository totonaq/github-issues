import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './Issues';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
       <Issues />   
    </BrowserRouter>
		
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
