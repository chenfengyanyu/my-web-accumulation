// https://github.com/yardnsm/ink-text-animation

'use strict';
import React from 'react';
import { h, render, Text } from 'ink';
import TextAnimation  from 'ink-text-animation';

class AnimationDemo extends React.Component {

    render() {
        return (
            <TextAnimation>
                <Text>{`Look at me, I'm moving!`}</Text>
            </TextAnimation>
        );
    }
}

render(<AnimationDemo/>);
