import React, { Component } from 'react';
import Navigation from '../components/navigation.jsx';
import axios from 'axios';


class About extends Component {

    constructor(props) {
        super(props);
    }



    render() {


        return (
            <div>
                <Navigation />
                <div className="create-group-form">
                    <div className="create-group-form-container">
                        <div className="create-group-form-header">
                            <h3>About</h3>
                        </div>

                        <div className="create-group-form-body">
                            <p style={{fontWeight: "600"}}>SplitDecision is an application that helps you organize your debts with other people. It is personal project
                                to learn about django framework.
                            </p>



                            <ol  style={{textAlign: "left"}}>
                                <li>
                                    You simply go to this <a style={{color: "blue"}} href="https://splitdecision.herokuapp.com/app" target="_blank">link</a>.
                                    Enter the name of your group and the members involved. Once you click submit, it should redirect you to 
                                    group page.
                                </li>
                                <br /><br />
                                <div style={{textAlign: "center"}}>
                                    <img src="/static/screenshots/createGroup.jpg" style={{ height: "50vh"}} />
                                </div>
                                <br /><br />
                                <li>
                                    Once you are on the group page, on the top right corner of the navigation bar is the current user setting.
                                    Select your name from this menu.
                                </li>
                                <br /><br />
                                <div style={{textAlign: "center"}}>
                                    <img src="/static/screenshots/setCurrentUser.jpg" style={{ height: "30vh"}} />
                                </div>
                                <br /><br />
                                <li>
                                    Click Add Items, a modal should popup with "Name" and "Price". Enter the item that you want to split. After which click 
                                    "Add Another Debt Owner". From here, select the person you wish to split the cost with and enter the amount of the split.
                                    You can add more than one debt owner. An example can be found below
                                </li>
                                <br /><br />
                                <div style={{textAlign: "center"}}>
                                    <img src="/static/screenshots/addItem.jpg" style={{ height: "30vh"}} />
                                </div>
                                <br /><br />
                                <li>
                                    Click Save once everything is filled out. The debts appear similar to the image below.
                                </li>
                                <br /><br />
                                <div style={{textAlign: "center"}}>
                                    <img src="/static/screenshots/addedItems.jpg" style={{ height: "30vh"}} />
                                </div>
                                <br /><br />
                             </ol>

                             <p><b>Note</b>: This is a work in progress application, features to come are: deletion of debts, user management module, Improved 
                             UI design, mathematical validations and sorting/fitlering</p>

                        </div>

                        
                    </div>
                </div>
            </div>
        );
    }
}

export default About;