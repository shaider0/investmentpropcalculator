import React from "react"
const axios = require('axios').default;

class Properties extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allProperties: []
        }
    }

    componentDidMount() {
        let api = "http://localhost:8081"
        if (window.location.hostname !== 'localhost') {
            api = "https://investmentpropcalcapi.herokuapp.com"
        }

        const getProperties = async () => {
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
        getProperties()
    }

    render() {
        const { allProperties } = this.state
        console.log('all', this.state)
        return (
            <>
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