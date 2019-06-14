import React from 'react';
import {render, Color} from 'ink';
import SelectInput from 'ink-select-input';

const SelectDemo = () => {
	const handleSelect = item => {
        // `item` = { label: 'First', value: 'first' }
        console.log('>>>>>>>', item.label);
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

	return (
        <Color white>
            <SelectInput color={'green'} items={items} onSelect={handleSelect}/>
        </Color>
    )
        
};

render(<SelectDemo/>);