import React, { Component } from 'react';
import Navigation from '../components/navigation.jsx';


class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            members: [
                {name: ""}
            ]
        }
    }

    addMember() {
        let { members } = this.state;
        members.push({name: ""});
        this.setState({members: members})
    }

    onChangeHandler(e) {
        let value = e.target.value;
        let name = e.target.name.split("~");
        let property = name[0], index = name[1];
        console.log("this.state", this.state);
        if (index)
        {
            let { members } = this.state; 
            members[index][property] = value;
            this.setState({members: members}); 
        }
        else 
        {
            this.setState({[property]: value});
        }

    }

    render() {
        let members = this.state.members.map((member, index) => {
            member = (<div key={index} className="col-xs-12">
                <input type="name" name={`name~${index}`} onChange={this.onChangeHandler.bind(this)} value={member.name} />
            </div>);
            return member;
        });

        return (
            <div>
                <Navigation />
                <div className="create-group-form">
                    <div className="create-group-form-container">
                        <div className="create-group-form-header">
                            <h3>Create Group</h3>
                        </div>

                        <div className="create-group-form-body">
                            <div className="create-group-form-name">
                                <label>Group Name</label><br />
                                <input name="groupName" onChange={this.onChangeHandler.bind(this)} type="name"/>
                            </div>
                            <div className="create-group-form-members">
                                <label>Member</label>
                                <div className="row">
                                    {members}
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <button onClick={this.addMember.bind(this)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGroup;