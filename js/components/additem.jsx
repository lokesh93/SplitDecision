import React, { Component } from 'react';

class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddItemModalOpen: false,
            debt: []
        };
    }

    handleNameChange(event)
    {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let nameAndIndex = target.name.split("~");
        
        let name = nameAndIndex[0];

        let objArr = this.state[name];

        let index;

        if (nameAndIndex[1]) 
        {
            index = parseInt(nameAndIndex[1]);
    
            let {debt} = this.state;
            let debtObj = debt[index];
    
            if (!debtObj)
            {
                debtObj = {};
            }
    
            debtObj[name] = value;
    
            debt[index] = debtObj;

            this.setState({
                debt: debt,
            });
        } 
        else 
        {
            
            this.setState({
                [name]: value
            });
        }


    }

    addAnotherRow()
    {
        let {debt} = this.state;
        let debtObj = {debtOwners: "", debtAmounts: 0};
        debt.push(debtObj);
        this.setState({debt: debt});
    }

    saveDebt()
    {
        let debtItem = this.state.debtItem;

        let debtItems = this.state.debt.map((db) => {
            return {
                debtOwner: db.debtOwners,
                debtDirection: "owes you",
                debtAmount: db.debtAmounts,
                debtItem: debtItem

            };
        });
        // () => this.props.onSave({debtOwner: "UP", debtDirection:"owes you", debtAmount: "$7", debtItem: "cheese"})
        console.log("debtItems", debtItems);
        this.props.onSave(debtItems);
    }


    render()
    {
        console.log(this.state);

        let debtOwnersRows = this.state.debt.map((dO, index) => {
            let debtOwnerName = "debtOwners~" + index;
            let debtAmountName = "debtAmounts~" + index;
            return ( 
                <div key={index}>
                    <select name={debtOwnerName} onChange={this.handleNameChange.bind(this)}>
                        <option key={1} value="reggie">Reggie</option>
                        <option key={2} value="timmy">Timmy</option>
                        <option key={3} value="patrick">Patrick</option>
                        <option key={4} value="jim">Jim</option>
                    </select>

                    <div className="switch-container">
                        <div className="switch-container-2">
                            <input type="checkbox" id="percentage-switch" />
                            <div className="switch">
                                
                            </div>
                        </div>

                    </div>

                    <input name={debtAmountName} type="number" onChange={this.handleNameChange.bind(this)}/>
                </div> );                          


        });

        let addItem = (
            <div className="add-item-modal">
                <div className="add-item-modal-container">
                    <a href="/" className="modal-close">X</a>
                    <div className="add-item-modal-content">
                        
                        <h1>Add this Item</h1>
                        <div className="item-form">
                            <label>Name:</label>
                            <input onChange={this.handleNameChange.bind(this)} type="name" name="debtItem"/><br />
                            <label>Price:</label>
                            <input onChange={this.handleNameChange.bind(this)} type="number" name="debtItemTotal"/>
                        </div>

                        <div className="recepient-form">
                            {debtOwnersRows}
                        </div>

                        <button onClick={this.addAnotherRow.bind(this)}>Add Another Debt Owner</button>
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