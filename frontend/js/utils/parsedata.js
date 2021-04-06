exports.parseGroup = (res) => {
    let {data} = res;
    let debtArr = [];
    data.debt_items.forEach(di => {
        let {debt_obligations, name, id} = di;

        if (debt_obligations.length > 0)
        {

            debtArr = debtArr.concat(debt_obligations.map((dbo) => {
                let debtDirection = "owes " + dbo.creditor.name;
                return {debtOwner: dbo.debtor.name, debtDirection:debtDirection, debtAmount: dbo.amount, debtItem: name, id: id}
            }));

        }
    });

    return { debtArray: debtArr, name: data.name };
};

exports.parseGroupForMembers = (res) => {
    return res.data.group_members;
};

exports.getRawDebtItems = (res) => {
    let {data} = res
    return data.debt_items.filter((di) => {
        return di.debt_obligations.length != 0
    })
};