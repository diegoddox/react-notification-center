import React, {Component} from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

export default class Notification extends Component {
    static displayName = 'Notification';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div clasName="">
                <Header>{this.state.current && this.state.current[this.mapOptions().title]}</Header>
                <Content onScrollBottom={this.props.onScrollBottom} onScroll={this.props.onScroll}>
                    <div className="desc">
                        {this.props.notification}
                    </div>
                </Content>
                <Footer>
                    <button type="button" onClick={this.props.onClick.bind(this)}>
                        <div className="back"></div>
                    </button>
                </Footer>
            </div>
        );
    }
}
