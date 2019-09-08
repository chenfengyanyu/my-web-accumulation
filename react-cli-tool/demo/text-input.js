import React from 'react';
import {render, Box, Color} from 'ink';
import TextInput from 'ink-text-input';

// https://github.com/vadimdemedes/ink-text-input

class SearchQuery extends React.Component {
	constructor() {
		super();

		this.state = {
			query: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	

	render() {
		return (
			<Box>
				<Box marginRight={1}>
					<Color green>
						Enter your query:
					</Color>
				</Box>

				<TextInput
					value={this.state.query}
					onChange={this.handleChange}
				/>
			</Box>
		);
	}

	handleChange(query) {
		this.setState({query});
	}
}

render(<SearchQuery/>);