import React from 'react';
import {render, Box} from 'ink';
import {UncontrolledTextInput} from 'ink-text-input';

const SearchQuery = () => {
	const handleSubmit = query => {
        // Do something with query
        console.log('get it~');
	};
	
	return (
		<Box>
			<Box marginRight={1}>
				Enter your query:
			</Box>

			<UncontrolledTextInput onSubmit={handleSubmit}/>
		</Box>
	);
};

render(<SearchQuery/>);