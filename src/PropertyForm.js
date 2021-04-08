import React from "react"

const PropertyForm = () => {
    return (
        <>
            <h1>Enter Property Details</h1>
            <form>
                <div>
                    <label for="purchase-price">Purchase Price</label>
                    <input type="text" id="purchase-price" />
                </div>
                <div>
                    <button type="submit">Calculate</button>
                </div>
            </form>
        </>
    )
}

export default PropertyForm