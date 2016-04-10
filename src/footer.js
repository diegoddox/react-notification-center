import React from 'react';

const NotificationFooter = props => <div className="rn-footer">{props.children}</div>;

NotificationFooter.displayName = 'NotificationHeader';
NotificationFooter.proptypes = {
    children: React.PropTypes.node.isRequired
};
export default NotificationFooter;
