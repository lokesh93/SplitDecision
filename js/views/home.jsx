import React, { Component } from 'react';
import Navigation from '../components/navigation.jsx';
import CollectionTable from '../components/collectiontable.jsx';
import Sidebar from '../components/sidebar.jsx';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    render() {
        console.log("props.id", this.props.match.params.id);
        return (
            <div>
                {/* <Navigation /> */}
                {/* <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <h2>Testing Props {this.props.testText}</h2> */}
                {/* <Sidebar /> */}
                <CollectionTable groupId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default Home;