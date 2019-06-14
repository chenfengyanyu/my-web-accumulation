'use strict';
const React = require('react');
const {render, Box, Static, Text} = require('ink');

class BoxDemo extends React.Component {

    render() {
        return (
            <Box>
                <div style="background: green;width: 50px;height: 30px;"></div>
                <Static>
                    <Text bold>I am bold</Text>
	            </Static>
                <Box textWrap="truncate-middle">Hello World</Box>
            </Box>
            
        );
    }
}

render(<BoxDemo/>);