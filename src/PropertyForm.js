import React from "react"
const axios = require('axios').default;

class PropertyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyAddress: "",
            purchasePrice: ""
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
        axios.post(`${api}/property`, {
            propertyAddress: this.state.propertyAddress,
            purchasePrice: this.state.purchasePrice
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
                        <input type="text" id="property-address" name="propertyAddress" value={this.state.propertyAddress} onChange={this.handleChange} placeholder="123 Main st" />
                    </label>
                </div>
                <div>
                    <label>
                        Purchase Price
                        <input type="number" id="purchase-price" name="purchasePrice" value={this.state.purchasePrice} onChange={this.handleChange} placeholder="100000" />
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