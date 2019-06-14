'use strict';

import React, {Fragment} from 'react';
import {render, Color} from 'ink';
import Spinner from 'ink-spinner';

// https://github.com/vadimdemedes/ink-spinner

class LoadingDemo extends React.Component {

    render() {
        return (
            <Fragment>
                <Color green><Spinner type="dots"/></Color>{' Loading'}
            </Fragment>
            
        );
    }
}

render(<LoadingDemo/>);