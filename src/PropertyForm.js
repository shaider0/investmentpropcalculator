import React from "react"
const axios = require('axios').default;

class PropertyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            purchasePrice: 100000
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ purchasePrice: event.target.value })
    }

    handleSubmit(event) {
        let api = "http://localhost:8081"
        if (window.location.hostname !== 'localhost') {
            api = "https://investmentpropcalcapi.herokuapp.com"
        }
        console.log('A name was submitted: ' + this.state.purchasePrice);
        event.preventDefault();
        axios.post(`${api}/property`, {
            purchasePrice: this.state.purchasePrice
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form id="property-form" onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Purchase Price
                        <input type="text" id="purchase-price" value={this.state.purchasePrice} onChange={this.handleChange} />
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

    // class NameForm extends React.Component {
    //     constructor(props) {
    //       super(props);
    //       this.state = {value: ''};

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    //     }

    // handleChange(event) {
    //   this.setState({value: event.target.value});
    // }

    // handleSubmit(event) {
    //   alert('A name was submitted: ' + this.state.value);
    //   event.preventDefault();
    // }

    //     render() {
    //       return (
    //         <form onSubmit={this.handleSubmit}>
    //           <label>
    //             Name:
    // <input type="text" value={this.state.value} onChange={this.handleChange} />
    //           </label>
    // < input type = "submit" value = "Submit" />
//         </form>
//       );
//     }
//   }