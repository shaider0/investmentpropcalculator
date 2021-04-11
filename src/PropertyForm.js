import React from "react"
const axios = require('axios').default;

class PropertyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyAddress: "",
            purchasePrice: "",
            downPayment: "",
            interestRate: "",
            loanTerm: "",
            rentalIncome: "",
            expenses: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        let api = "http://localhost:8081"
        if (window.location.hostname !== 'localhost') {
            api = "https://investmentpropcalcapi.herokuapp.com"
        }
        event.preventDefault();
        const { propertyAddress,
            purchasePrice,
            downPayment,
            interestRate,
            loanTerm,
            rentalIncome,
            expenses } = this.state
        axios.post(`${api}/property`, {
            propertyAddress,
            purchasePrice,
            downPayment,
            interestRate,
            loanTerm,
            rentalIncome,
            expenses
        })
            .then(function (response) {
                console.log(response);
            })
            .then(this.props.getProperties)
            .then(this.setState({ propertyAddress: "", purchasePrice: "" }))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form id="property-form" onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Property Address
                        <input required type="text" id="property-address" name="propertyAddress" value={this.state.propertyAddress} onChange={this.handleChange} placeholder="123 Main st" />
                    </label>
                </div>
                <div>
                    <label>
                        Purchase Price
                        <input required type="number" id="purchase-price" name="purchasePrice" value={this.state.purchasePrice} onChange={this.handleChange} placeholder="100000" />
                    </label>
                </div>
                <div>
                    <label>
                        Down Payment
                        <input required type="number" id="down-payment" name="downPayment" value={this.state.downPayment} onChange={this.handleChange} placeholder="20000" />
                    </label>
                </div>
                <div>
                    <label>
                        Interest Rate
                        <input required type="number" id="interest-rate" name="interestRate" value={this.state.interestRate} onChange={this.handleChange} placeholder="4.5" />
                    </label>
                </div>
                <div>
                    <label>
                        Loan Term (Years)
                        <input required type="number" id="loan-term" name="loanTerm" value={this.state.loanTerm} onChange={this.handleChange} placeholder="30" />
                    </label>
                </div>
                <div>
                    <label>
                        Rental Income (Monthly)
                        <input required type="number" id="rental-income" name="rentalIncome" value={this.state.rentalIncome} onChange={this.handleChange} placeholder="1500" />
                    </label>
                </div>
                <div>
                    <label>
                        Expenses (Monthly)
                        <input required type="number" id="expenses" name="expenses" value={this.state.expenses} onChange={this.handleChange} placeholder="500" />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default PropertyForm