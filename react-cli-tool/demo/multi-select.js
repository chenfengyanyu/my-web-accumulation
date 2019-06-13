// https://github.com/karaggeorge/ink-multi-select

import React from 'react';
import {render} from 'ink';
import MultiSelect from 'ink-multi-select';

const Demo = () => {
	const handleSubmit = items => {
		// `items` = [{ label: 'First', value: 'first' }, { label: 'Third', value: 'third' }]
	};

	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	return <MultiSelect items={items} onSubmit={handleSubmit}/>
};

render(<Demo/>);

