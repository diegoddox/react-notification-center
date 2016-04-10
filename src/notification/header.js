import React from 'react';

const NotificationHeader = props => (
    <div className="rn-header">
        <h4>{props.children}</h4>
    </div>
);

NotificationHeader.displayName = 'NotificationHeader';
NotificationHeader.proptypes = {
    children: React.PropTypes.node.isRequired
};
export default NotificationHeader;
