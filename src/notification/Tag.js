import React from 'react';
import cn from 'classnames';

const Tag = props => (
    <span className={cn('notification-tag', props.type)}>
        {props.children}
    </span>
);

Tag.displayName = 'NotificationTagComponent';
Tag.propTypes = {
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
};
export default Tag;
