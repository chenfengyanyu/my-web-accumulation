// https://github.com/sindresorhus/ink-gradient

import React from 'react';
import {render} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

render(
	<Gradient name="rainbow">
		<BigText text="Jartto"/>
	</Gradient>
);