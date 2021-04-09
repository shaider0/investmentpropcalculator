import React from "react"
const axios = require('axios').default;

class Properties extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allProperties: {}
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
                console.log('result from api is', result)
                await this.setState({
                    allProperties: result
                })

            } catch (e) {
                console.log('Error', e)
            }
        }
    }

    render() {
        return (
            <h1>All Properties</h1>
        )
    }
}

export default Properties