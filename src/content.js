import React, {Component} from 'react';

export default class NotificationContent extends Component {
    constructor(props) {
        super(props);
        this.onContentScroll = this.onContentScroll.bind(this);
    }

    componentDidMount() {
        this.refs.rrContent.addEventListener('scroll', this.onContentScroll);
    }

    componentWillUnmount() {
        this.refs.rrContent.removeEventListener('scroll', this.onContentScroll);
    }

    onContentScroll(e) {
        if (this.props.contentScroll) {
            this.props.contentScroll(e);
        }

        if ((e.target.scrollHeight - e.target.scrollTop) == e.target.clientHeight) {
            if (this.props.scrollOnBottom) {
                this.props.scrollOnBottom();
            }
        }
    }

    render() {
        return (
            <div className="rn-content" ref="rrContent">
                {this.props.children}
            </div>
        );
    }
}

NotificationContent.displayName = 'NotificationContent';
NotificationContent.proptypes = {
    children: React.PropTypes.node.isRequired
};
