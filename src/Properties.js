import PropertyForm from "./PropertyForm"
import React from "react"
import defaultImage from "./images/default.jpg"
import './Properties.css';
const axios = require('axios').default;

class Properties extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allProperties: []
        }
        this.getProperties = this.getProperties.bind(this);
    }

    getProperties() {
        let api = "http://localhost:8081"
        if (window.location.hostname !== 'localhost') {
            api = "https://investmentpropcalcapi.herokuapp.com"
        }

        const getPropertiesFromApi = async () => {
            try {
                const result = await axios.get(`${api}/property`)
                await this.setState({
                    allProperties: result.data
                })

            } catch (e) {
                console.log('Error', e)
            }
        }
        getPropertiesFromApi()
    }

    componentDidMount() {
        this.getProperties()
    }

    render() {
        const { allProperties } = this.state
        return (
            <>
                <PropertyForm getProperties={this.getProperties} />
                <ul>
                    {allProperties.map(property => (
                        <li key={property._id} className="property container">
                            <div className="row user-content">
                                <div className="col-sm-4">
                                    <img src={defaultImage} height="150" width="150" />
                                </div>
                                <div className="col-sm-4">
                                    <h2>Data Provided:</h2>
                                    <h3>
                                        {property.propertyAddress}
                                    </h3>
                                    <div>
                                        <b>Purchase Price: </b>${property.purchasePrice}
                                    </div>
                                    <div>
                                        <b>Down Payment: </b>${property.downPayment}
                                    </div>
                                    <div>
                                        <b>Interest Rate: </b> {property.interestRate}%
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div>
                                        <b>Loan Term: </b>${property.loanTerm} Years
                                    </div>
                                    <div>
                                        <b>Monthly Rental Income: </b>${property.rentalIncome}
                                    </div>
                                    <div>
                                        <b>Monthly Expenses: </b>${property.expenses}
                                    </div>
                                </div>
                            </div>
                            <div className="row calculated-content">
                                <div className="col-sm-12">
                                    <h2>Analysis:</h2>
                                    <div>
                                        <b>Loan Amount </b>${property.purchasePrice - property.downPayment}
                                    </div>
                                    <div>
                                        <b>Monthly Mortgage Payment: </b>TO BE CALCULATED
                                    </div>
                                    <div>
                                        <b>Total Monthly Expenses: </b>${property.expenses}
                                    </div>
                                    <div>
                                        <b>Total Monthly Cash Flow </b>${property.expenses}
                                    </div>
                                    <div>
                                        <b>Cash on Cash Return </b>${property.expenses}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Properties