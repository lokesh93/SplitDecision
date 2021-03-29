import React, { Component } from 'react';

class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddItemModalOpen: false,
            debt: props.debt || {},
            groupMembers: props.groupMembers,
            currentGroupMember: props.currentGroupMember || "",
            editMode: props.editMode || false
        };
    }

    handleNameChange(event)
    {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let nameAndIndex = target.name.split("~");

        console.log("nameAndIndex", nameAndIndex);
        
        let name = nameAndIndex[0];

        let objArr = this.state[name];

        let index;

        if (nameAndIndex[1]) 
        {
            index = parseInt(nameAndIndex[1]);
    
            let {debt} = this.state;
            let debtObj = {}
    
            if (debt.debt_obligations)
            {
                debtObj = debt.debt_obligations[index] || {};
            } 
            else 
            {
                debt.debt_obligations = [];
            }
            
            if (name == "name")
            {                
                debtObj["debtor"] = this.state.groupMembers.find(gm => gm.name == value)
            }
            else
            {
                debtObj[name] = value;
            }

    
            debt.debt_obligations[index] = debtObj;

            this.setState({
                debt: debt,
            });
        } 
        else 
        {
            let {debt} = this.state;
            debt[name] = value;
            
            this.setState({
                debt: debt,
            });
        }


    }

    addAnotherRow()
    {
        let {debt} = this.state;
        if (!debt.debt_obligations)
        {
            debt.debt_obligations = []
        }
        let debtObj = {
            name: "",
            amount: 0,
            // creditor: {name: ""},
            debtor: {name: ""}
        };
        debt.debt_obligations.push(debtObj);
        this.setState({debt: debt});
    }

    saveDebt()
    {
        
        let debtOblArr = this.state.debt.debt_obligations || [];
        let group_id;

        let debt_obligations = debtOblArr.map((d) =>
        {
            let debtor = d.debtor || this.state.groupMembers.find(gp => gp.name == d.name)
            let creditor = d.creditor || this.state.groupMembers.find(gp => gp.name == this.state.currentGroupMember);

            group_id = debtor.group_id

            return {
                creditor: creditor,
                debtor: debtor,
                amount: d.amount
            }
        });

        let debt = {
            amount: this.state.debt.amount,
            name: this.state.debt.name,
            debt_obligations: debt_obligations,
            group_id: group_id ,
        }

        if (this.state.debt.id)
        {
            debt.id = this.state.debt.id
        }

        console.log("debt", debt);
        this.props.onSave(debt, this.state.editMode);

    }

    renderDebtOWnerRows()
    {
        let { debt, groupMembers, currentGroupMember } = this.state;

        let debt_obligations = debt.debt_obligations || []

        let groupMembersWithoutCurrentMember = groupMembers.filter(gp => !(gp.name == currentGroupMember));


        let debtOwnersRows = debt_obligations.map((debtObj, index) => {
            let debtOwnerName = "name~" + index;
            let debtAmountName = "amount~" + index;
            let debtOwnerMenu = [ <option key={0} value="-">-</option>];
            debtOwnerMenu = debtOwnerMenu.concat(groupMembersWithoutCurrentMember.map((gm, indexGm) => {
                return (
                    <option key={indexGm + 1} value={gm.name} selected={debtObj.debtor.name == gm.name}>{gm.name}</option>
                )
            }));

            return ( 
                <div key={index}>
                    <select name={debtOwnerName} onChange={this.handleNameChange.bind(this)}>
                        {debtOwnerMenu}
                    </select>

                    <div className="switch-container">
                        <div className="switch-container-2">
                            <input type="checkbox" id="percentage-switch" />
                            <div className="switch">
                                
                            </div>
                        </div>

                    </div>

                    <input name={debtAmountName} type="number" value={debtObj.amount} onChange={this.handleNameChange.bind(this)}/>
                </div> );
        });

        return debtOwnersRows;

    }


    render()
    {
        console.log("this.state",this.state);

        let { name, amount } = this.state.debt;
        

        let addItem = (
            <div className="add-item-modal">
                <div className="add-item-modal-container">
                    <a href="javascript:void(0)"  onClick={this.props.onModalClose.bind(this)} className="modal-close">X</a>
                    <div className="add-item-modal-content">
                        
                        <h1>Add this Item</h1>
                        <div className="item-form">
                            <label>Name:</label>
                            <input onChange={this.handleNameChange.bind(this)} value={name} type="name" name="name"/><br />
                            <label>Price:</label>
                            <input onChange={this.handleNameChange.bind(this)} value={amount} type="number" name="amount"/>
                        </div>

                        <div className="recepient-form">
                            {this.renderDebtOWnerRows()}
                        </div>

                        <button className="add-item add-item-main" onClick={this.addAnotherRow.bind(this)}>Add Another Debt Owner</button>
                    </div>                  
                    <div className="modal-btns">
                        <button className="save-btn add-item" onClick={this.saveDebt.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        );
        return addItem;
    }
}

export default AddItem;