import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import {EE} from './emitter';
import NotificationItem from './Item';
import Header from './header';
import Content from './content';
import Footer from './footer';
import {cutString} from './utils';

export default class ReduxModal extends Component {
    static displayName = 'ReduxNotofication';

    static propTypes = {
        notifications: PropTypes.array,
        mapToItem: PropTypes.object,
        onItemClick: PropTypes.func,
        customItemComponent: PropTypes.func,
        onNotificatioOpen: PropTypes.func,
        onNotificatioClose: PropTypes.func,
        onScrollBottom: PropTypes.func,
        position: PropTypes.string,
        wordsInItem: PropTypes.number,
        noNotificationText: PropTypes.string
    };

    static defaultProps = {
        notificationTitle: 'React notification center',
        position: 'left',
        wordsInItem: 50,
        noNotificationText: 'No data available, enjoy your day',
        mapToItem: {},
        notifications: []
    };

    constructor(props) {
        super(props);
        this.state = {
            notifications: this.props.notifications,
            showNotification: false,
            showNotificationMessage: false,
            current: null
        };

        this.isChildOf = this.isChildOf.bind(this);
        this.mapOptions = this.mapOptions.bind(this);
        this.getUnreadLength = this.getUnreadLength.bind(this);
        this.renderNotificationItem = this.renderNotificationItem.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
    }

    componentDidMount() {
        EE.on('add/notification', (data) => {
            this.setState({
                notifications: [
                    data,
                    ...this.state.notifications
                ]
            });
        });
        EE.on('clear/all', () => {
            this.setState({
                notifications: [],
                showNotification: false,
                current: null
            });
        });

        if (document) {
            document.addEventListener('click', this.toggleNotification);
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications.length !== this.state.notifications.length) {
            this.setState({
                notifications: nextProps.notifications
            });
        }
    }

    componentWillUnmount() {
        EE.off('add/notification');
        EE.off('clear/all');
        if (document) {
            document.removeEventListener('click', this.toggleNotification);
        }
    }

    getUnreadLength() {
        return this.state.notifications.filter(item => !item[this.mapOptions().read]).length;
    }

    toggleNotification(e) {
        if (e.target == this.refs.notificationIcon && !this.state.showNotification) {
            this.setState({
                showNotification: true
            });
            if (this.props.onNotificatioOpen) {
                this.props.onNotificatioOpen(this.state.notifications);
            }
        } else if (this.state.showNotification && !this.isChildOf(e.target, this.refs.notificationHolder)) {
            this.setState({
                showNotification: false,
                showNotificationMessage: false,
                current: null
            });
            if (this.props.onNotificatioClose) {
                this.props.onNotificatioClose(this.state.notifications);
            }
        }
    }

    isChildOf(child, parent) {
        if (child.parentNode === parent) {
            return true;
        } else if (child.parentNode === null) {
            return false;
        } else {
            return this.isChildOf(child.parentNode, parent);
        }
    }

    mapOptions() {
        return {
            id: this.props.mapToItem.id || 'id',
            title: this.props.mapToItem.title || 'title',
            message: this.props.mapToItem.message || 'message',
            date: this.props.mapToItem.date || 'date',
            read: this.props.mapToItem.read || 'read'
        };
    }

    onItemClick(item) {
        this.setState({
            notifications: this.state.notifications.map(notification => {
                if (!notification[this.mapOptions().id]) {
                    console.error('React Notification ERROR: For more information about this issue http://localhost:4001/');
                    return notification;
                }

                if (notification[this.mapOptions().id] == item[this.mapOptions().id]) {
                    notification[this.mapOptions().read] = true;
                }
                return notification;
            }),
            showNotificationMessage: true,
            current: item
        });
        if (this.props.onItemClick) {
            this.props.onItemClick(item, this.state.notifications);
        }
    }

    back() {
        this.setState({
            showNotificationMessage: false
        });
    }

    renderNotificationItem(item, i) {
        if (this.props.customItemComponent) {
            return <this.props.customItemComponent key={i} {...item} />;
        }
        return (
            <NotificationItem
                key={i} onClick={this.onItemClick.bind(this, item)}
                options={this.mapOptions()}
                {...item}/>
        );
    }

    render() {
        return (
            <div className={cn('react-notification-center', 'light-theme', {hide: !this.props.visible})}>
                <div className={cn('r-notifications-icon', {active: this.getUnreadLength()})} ref="notificationIcon">
                    {this.getUnreadLength() > 0 && this.getUnreadLength()}
                </div>
                {this.state.showNotification &&
                    <div className={cn('rr-wrapper', this.props.position)} ref="notificationHolder">
                        <div className="notification-holder">
                            <div className="r-notifications">
                                <Header>{cutString(this.props.notificationTitle, 30)}</Header>
                                <Content {...this.props}>
                                    {this.state.notifications.length == 0 &&
                                        <div className="no-rn">{this.props.noNotificationText}</div>
                                    }
                                    {this.state.notifications &&
                                        <ul className="rn-ul">
                                            {this.state.notifications.map((item, i) => {
                                                return this.renderNotificationItem(item, i);
                                            })}
                                        </ul>
                                    }
                                </Content>
                                <Footer></Footer>
                            </div>

                            <div className={cn('r-notification', {active: this.state.showNotificationMessage})}>
                                <Header>{this.state.current && this.state.current[this.mapOptions().title]}</Header>
                                <Content {...this.props}>
                                    <div className="desc">
                                        {this.state.current && this.state.current[this.mapOptions().message]}
                                    </div>
                                </Content>
                                <Footer>
                                    <button type="button" onClick={this.back.bind(this)}>
                                        <div className="back"></div>
                                    </button>
                                </Footer>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}
