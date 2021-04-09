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
                console.log('result is', result)
                await this.setState({
                    allProperties: result.data
                })
                console.log("state shows", this.state.allProperties)

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
        console.log('this', this.getProperties)
        console.log('all', this.state)
        return (
            <>
                <PropertyForm getProperties={this.getProperties} />
                <ul>
                    {allProperties.map(property => (
                        <li key={property._id}>
                            {property.purchasePrice}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Properties