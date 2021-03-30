import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AddItem from './additem.jsx';
import axios from 'axios';
import Navigation from './navigation.jsx';
import ParseDataUtil from '../utils/parsedata.js';



let debtArr = [
    {debtOwner: "LP", debtDirection:"owes you", debtAmount: "$25", debtItem: "beer"},
    {debtOwner: "RP", debtDirection:"owes you", debtAmount: "$50", debtItem: "Hotel"},
    {debtOwner: "BP", debtDirection:"owes you", debtAmount: "$25", debtItem: "beer"},
    {debtOwner: "UP", debtDirection:"owes you", debtAmount: "$50", debtItem: "concert tickets"}
];

const cancelTokenSource = axios.CancelToken.source();
class CollectionTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddItemModalOpen: false,
            debtArray: debtArr,
            groupMembers: [],
            currentGroupMember: ""
        };
    }

    refreshHandler()
    {
        if (this.props.groupId)
        {
            axios.get(`/groups/` + this.props.groupId + `/?format=json`, {
                cancelToken: cancelTokenSource.token
            })
                .then(res => {
                    let debtArray = ParseDataUtil.parseGroup(res);
                    let groupMembers = ParseDataUtil.parseGroupForMembers(res);
                    console.log("groupMembers", groupMembers);
                    this.setState({
                        debtArray: debtArray, 
                        groupMembers: groupMembers, 
                        rawDebt: ParseDataUtil.getRawDebtItems(res), 
                        editDebt: null, 
                        isAddItemModalOpen: false, 
                        editMode: false
                    });
                }); 
        }
   
    }

    componentDidMount()
    {
        this.refreshHandler();
    }

    componentWillUnmount()
    {
        cancelTokenSource.cancel("cancel req");
    }


    openAddItemModal()
    {
        this.setState({isAddItemModalOpen: !this.state.isAddItemModalOpen});

    }

    addItem(item)
    {
        let { debtArray } = this.state;
        this.setState({debtArray: debtArray.concat(item), isAddItemModalOpen: false});
    }

    addItem2(itemInfo, isEdit)
    {
        console.log(itemInfo)
        if (!isEdit)
        {
            axios.post("/debtitems/", itemInfo).then((res) => this.refreshHandler());
        }
        else 
        {
            axios.put("/debtitems/" + itemInfo.id + "/", itemInfo).then((res) => this.refreshHandler());
        }
        
    }

    editItem(debtItemId)
    {
        let {debtArray, rawDebt} = this.state;
        let editDebt = rawDebt.find(rd => rd.id == debtItemId);

        console.log("this.state", this.state);
        console.log("editDebt", editDebt)
        this.setState({editDebt: editDebt, isAddItemModalOpen: true, editMode: true})
    }

    modalClose()
    {
        this.setState({editDebt: null, isAddItemModalOpen: false, editMode: false})
    }

    setCurrentGroupMember(event)
    {
        this.setState({currentGroupMember: event.target.value});
    }

    render()
    {
        let { debtArray, groupMembers } = this.state;
        let collectionRow = debtArray.map((debt, index) => {
        let debtDirection = (<div className="you-owe">
                    {debt.debtDirection}
                </div>);


            let debtAmount = <div className="item-price">{debt.debtAmount}</div>;
            let debtItemName = <div className="debt-item-name">{debt.debtItem}</div>; 

            return (<div key={index} className="collection-row" onClick={this.editItem.bind(this, debt.id)}>
                        <div className="user-initals">
                            {debt.debtOwner}
                            {debtDirection}
                        </div>
                        <div className="item-name">
                            {debtAmount}
                            {debtItemName}
                        </div>

                    </div>);
        });

        let buttons = (<button className="add-item add-item-main" onClick={this.openAddItemModal.bind(this)}>Add Item</button>)

        let addItemModal = (this.state.isAddItemModalOpen ?
                                                     <AddItem
                                                        onSave={this.addItem2.bind(this)}
                                                        groupMembers={groupMembers}
                                                        currentGroupMember={this.state.currentGroupMember}
                                                        editMode={this.state.editMode}
                                                        debt={this.state.editDebt}
                                                        onModalClose={this.modalClose.bind(this)}
                                                        /> : null);

            let groupMembersOptions = this.state.groupMembers.map((gm) => {
                return (<option value={gm.name} selected={gm.name == this.state.currentGroupMember}>{gm.name}</option>)
            })
            
            let groupMembersSelect = (<select onChange={this.setCurrentGroupMember.bind(this)}>{groupMembersOptions}</select>);

            let users = this.state.groupMembers.map((gm) => { return gm.name })
            let navi = ( <Navigation 
                            usernames={users}
                            setCurrentGroupMember={this.setCurrentGroupMember.bind(this)} />);
            console.log("users", typeof Array.from(users));

        let collectionTable =   (<div>
                                   {navi}
                                    <div className="collection-table">
                                        {groupMembersSelect}
                                        <div className="collection-row collection-table-heading">
                                            <div className="sort-by-user">
                                                <span className="table-heading">Users</span>
                                            </div>
                                            <div className="sort-by-item">
                                                <span className="table-heading">Item</span>
                                            </div>
                                        </div>
                                        {collectionRow}
                                        {addItemModal}
                                        {buttons}
                                    </div>
                                </div>);
        return collectionTable;
    }
}

export default CollectionTable;