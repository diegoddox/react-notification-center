import React, {Component} from 'react';
import {render} from 'react-dom';

import './index.less';
import './../src/less/index.less';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import uiid from 'uuid';
import ReactNotificationCenter from './../src/';

class App extends Component {
    constructor(props) {
        super(props);

        this.notificationOptions = {
            id: '__id',
            message: 'text',
            new: 'active',
            date: 'startDate'
        };

        this.notifications = [
            {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 3}),
                active: true,
                tags: [{
                    type: 'success',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: true,
                tags: [{
                    type: 'info',
                    text: loremIpsum({count: 1, units: 'words'})
                }, {
                    type: 'warning',
                    text: loremIpsum({count: 1, units: 'words'})
                }, {
                    type: 'danger',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: true,
                tags: [{
                    type: 'warning',
                    text: loremIpsum({count: 1, units: 'words'})
                }],
                startDate: moment().format('LLL')
            }, {
                __id: uiid.v1(),
                title: loremIpsum({count: 1}),
                text: loremIpsum({count: 6}),
                active: true,
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
    }

    addnotification(tagType) {
        this.setState({
            notifications: [
                {
                    __id: uiid.v1(),
                    title: loremIpsum({count: 1}),
                    text: loremIpsum({count: 6}),
                    active: true,
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
                            Just include the notification-icon where you want config and you're ready to go!
                        </div>
                    </div>
                    <div className="menu">
                        <div className="app-notification">
                            <ReactNotificationCenter
                                notifications={this.state.notifications}
                                onNotificationOpen={() => console.log('Notification has open')}
                                onNotificationClose={() => console.log('Notification has close')}
                                onItemClick={() => console.log('The item has been clicked')}
                                onScroll={() => console.log('You are scrolling')}
                                onScrollBottom={() => console.log('you are on the bottom')}
                                mapToItem={this.notificationOptions}/>
                        </div>
                        <button
                            type="button"
                            className="link first"
                            onClick={this.addnotification.bind(this, 'danger')}>
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
App.displayName = 'ReactNotificationDevApp';

render(<App />, document.getElementById('app'));
