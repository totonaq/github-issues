import React from 'react';
import loading from './loading.gif';

const Loading = () => {

	return (
		<div style={{textAlign: 'center'}} >
			<img src={loading} alt='loading' />
		</div>
	)
}

export default Loading