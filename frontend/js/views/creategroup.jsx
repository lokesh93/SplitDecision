import React, { Component } from 'react';
import Navigation from '../components/navigation.jsx';
import axios from 'axios';


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

    componentDidMount()
    {
        axios.get(`http://127.0.0.1:8000/creategroup/1/`)
            .then(res => {
                console.log("res", res);
            });
    }

    addMember() 
    {
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

    saveGroup()
    {
        console.log("this.state", this.state);

        let { members, groupName } = this.state;


        let createGroupJson = {
            name: groupName,
            group_members: members
        };

        axios.post(`http://127.0.0.1:8000/creategroup`, createGroupJson)
            .then(res => {
            console.log(res);
            window.location.assign("/app/group/" + res.data.id);
            //console.log(res.data);
            });

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
                                        <button className="add-item" onClick={this.addMember.bind(this)}>Add Member</button>
                                        <button className="add-item" onClick={this.saveGroup.bind(this)}>Save Group</button>
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