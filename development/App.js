import './index.less';
import './../src/less/index.less';
import React, {Component} from 'react';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import uiid from 'uuid';
import ReactNotification, {notify} from './../src/';

// const customItemComponentTest = props => <div>{props.text}</div>;

export default class App extends Component {
    static displayName = 'ReactNotificationDevApp';

    constructor(props) {
        super(props);

        this.notificationOptions = {
            id: '__id',
            title: 'title',
            message: 'text',
            read: 'active',
            date: 'startDate'
        };

        this.notifications = [
            {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 3}),
                active: false,
                tags: [{
                    type: 'success',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: false,
                tags: [{
                    type: 'info',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: false,
                tags: [{
                    type: 'warning',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: false,
                tags: [{
                    type: 'danger',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }
        ];

        this.state = {
            notifications: this.notifications
        };

        this.fetchData = this.fetchData.bind(this);
    }

    addnotification(tagType) {
        this.setState({
            notifications: [
                {
                    __id: uiid.v1(),
                    title: loremIpsum({count: 1}),
                    text: loremIpsum({count: 6}),
                    active: false,
                    tags: [{
                        type: tagType ? tagType : 'info',
                        text: loremIpsum({count: 1, units: 'words'})
                    }],
                    startDate: moment().format('LLL')
                },
                ...this.state.notifications
            ]
        });
    }

    fetchData() {
        notify.add();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="fake-app">
                    <div className="demo-icon-info">
                        <div className="app-icon">
                            <div className="no-length">7</div>
                            <img src="http://diegoddox.github.io/react-notification-center/images/demo-icon.png" />
                        </div>
                        <div className="description">
                            Just include the notificationIcon where you want config it and you're read to go!
                        </div>
                    </div>
                    <div className="menu">
                        <div className="app-notification">
                            <ReactNotification
                                notifications={this.state.notifications}
                                fetch={this.fetchData}
                                onNotificatioOpen={() => console.log('Notification has open')}
                                onNotificatioClose={() => console.log('Notification has close')}
                                onItemClick={() => console.log('The item has been clicked')}
                                mapToItem={this.notificationOptions}/>
                        </div>
                        <button
                            type="button"
                            className="link first"
                            onClick={this.addnotification.bind(this, 'error')}>
                            Add notification
                        </button>
                        <button
                            className="link"
                            onClick={this.addnotification.bind(this, 'info')}>
                            Add notification with INFO tag
                        </button>
                    </div>
                    <div className="content">
                        <div className="avatar"></div>
                        <div className="box"></div>
                        <div className="box second"></div>

                        <div className="line"></div>
                        <div className="line small"></div>
                        <div className="line large"></div>
                        <div className="line medium"></div>
                    </div>
                </div>
            </div>
        );
    }
}
