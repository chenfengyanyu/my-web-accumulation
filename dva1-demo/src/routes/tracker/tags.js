import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Tag } from 'antd';

class Tags extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    tagsNum: '',
  }

  componentWillMount() {
    this.setState({ tagsNum: this.props.tags.length, tags: this.props.tags });
  }

  removeTag = (removedValue) => {
    const tags = this.state.tags.filter(tag => tag !== removedValue);
    this.setState({
      tags,
      tagsNum: this.state.tagsNum - 1,
    });
    this.props.updateTags(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  addTag = () => {
    if (this.state.tagsNum < 4) {
      const inputValue = this.state.inputValue;
      let tags = this.state.tags;
      if (inputValue) {
        if (tags.indexOf(inputValue) === -1) {
          tags = [
            ...tags,
            inputValue,
          ];
        }
        this.props.updateTags(tags);
        this.setState({
          tags,
          inputVisible: false,
          tagsNum: this.state.tagsNum + 1,
          inputValue: '',
        });
      } else {
        this.setState({ inputVisible: false });
      }
    }
  };
  render() {
    return (
      <div style={{ width: 291, overflow: 'hidden' }}>
        {this.state.tags && this.state.tags.map((tag, index) => {
          const tagElem = (
            <Tag color={this.props.color} key={tag + index} closable={index >= 0} afterClose={() => this.removeTag(tag)}>
              {tag}
            </Tag>
          );
          return tagElem;
        })}
        {(this.state.inputVisible && this.state.tagsNum < 4) &&
          <Input type="text" size="small" style={{ width: 78 }} value={this.state.inputValue} onChange={this.handleInputChange} onBlur={this.addTag} onPressEnter={this.addTag} />
        }
        {(!this.state.inputVisible && this.state.tagsNum < 4) &&
          <Button size="small" type="dashed" onClick={this.showInput}>+ {this.props.type}</Button>
        }
      </div>
  )}
}

export default Tags;
