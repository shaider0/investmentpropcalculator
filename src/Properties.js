import PropertyForm from "./PropertyForm"
import React from "react"
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
                        <li key={property._id}>
                            {property.propertyAddress} ${property.purchasePrice} ${property.downPayment} ${property.interestRate} ${property.loanTerm} ${property.rentalIncome} ${property.expenses}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Properties