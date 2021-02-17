import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AddItem from './additem.jsx';


let debtArr = [
    {debtOwner: "LP", debtDirection:"owes you", debtAmount: "$25", debtItem: "beer"},
    {debtOwner: "RP", debtDirection:"owes you", debtAmount: "$50", debtItem: "Hotel"},
    {debtOwner: "BP", debtDirection:"owes you", debtAmount: "$25", debtItem: "beer"},
    {debtOwner: "UP", debtDirection:"owes you", debtAmount: "$50", debtItem: "concert tickets"}
];

class CollectionTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddItemModalOpen: false,
            debtArray: debtArr
        };
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

    closeModal()
    {
        this.setState({isAddItemModalOpen: false});
    }

    render()
    {
        let { debtArray } = this.state;
        let collectionRow = debtArray.map((debt, index) => {
            let debtDirection;
            if (debt.debtDirection == "owes you") {
                debtDirection = (<div className="owes-you">
                                        owes you
                                    </div>)
            } else {
                debtDirection = (<div className="you-owe">
                    you owe
                </div>)
            }

            let debtAmount = <div className="item-price">{debt.debtAmount}</div>;
            let debtItemName = <div className="debt-item-name">{debt.debtItem}</div>; 

            return (<div key={index} className="collection-row">
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

        let buttons = (<button className="add-item" onClick={this.openAddItemModal.bind(this)}>Add Item</button>)

        let addItemModal = (this.state.isAddItemModalOpen ?
                                                     <AddItem 
                                                        onClose={this.closeModal.bind(this)}
                                                        onSave={this.addItem.bind(this)}
                                                        /> : null);

        let collectionTable =   (<div className="collection-table">
                                    <div className="collection-row collection-table-heading">
                                        <div className="sort-by-user">
                                            {/* <div className="icon-container">
                                                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                            </div> */}
                                            <span className="table-heading">Users</span>
                                        </div>
                                        <div className="sort-by-item">
                                            {/* <div className="icon-container">
                                                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                            </div> */}
                                            <span className="table-heading">Item</span>
                                        </div>
                                    </div>
                                    {collectionRow}
                                    {addItemModal}
                                    {buttons}
                                </div>);
        return collectionTable;
    }
}

export default CollectionTable;