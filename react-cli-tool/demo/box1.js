// https://github.com/sindresorhus/ink-box

import React from 'react';
import {render, Color} from 'ink';
import Box from 'ink-box';

render(
	<Box borderStyle="round" borderColor="cyan" float="center" padding={1}>
		Hello <Color yellow>Jartto</Color>
	</Box>
);