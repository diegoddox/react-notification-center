import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import Tag from './Tag';
import {cutString} from './utils';

export default class NotificationItem extends Component {
    static displayName = 'NotificationItemComponent';

    static propTypes = {
        onClick: PropTypes.func,
        tags: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleOnClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props);
        }
    }
    render() {
        return (
            <li className={cn('rn-item', {new: this.props[this.props.options.new]})} onClick={this.handleOnClick.bind(this)}>
                <p className="short-desc">
                    {this.props.tags && this.props.tags.map((item, i) => <Tag key={i} {...item}>{item.text}</Tag>)}
                    {this.props[this.props.options.title] && <strong className="title">{this.props[this.props.options.title]} </strong>}
                    {this.props[this.props.options.message] && cutString(this.props[this.props.options.message], 50)}
                    {this.props[this.props.options.date] && <small className="date">{this.props[this.props.options.date]}</small>}
                </p>
            </li>
        );
    }
}
