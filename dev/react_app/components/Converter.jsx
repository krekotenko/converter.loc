import React, { Component } from "react";
import axios from "axios";

class Converter extends Component {
    state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        currencies: [],
    };

    // Initializes the currencies with values from the api
    componentDidMount() {
        axios
            .get("/get-currencies")
            .then(response => {
                // Initialized with 'EUR' because the base currency is 'EUR'
                // and it is not included in the response
                const currencyAr = ["EUR"]
                for (const key in response.data.rates) {
                    currencyAr.push(key)
                }
                this.setState({ currencies: currencyAr.sort() })
            })
            .catch(err => {
                console.log("Ошибка соединения", err.message);
            });
    }

    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(`/get-rate/${this.state.fromCurrency}/${this.state.toCurrency}`)
                .then(response => {
                    const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                    this.setState({ result: result.toFixed(5) })
                })
                .catch(err => {
                    console.log("Валюты одинаковы", err.message);
                });
        } else {
            this.setState({ result: "Нечего конвертировать!" })
        }
    };

    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
        if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div className="Converter">
            <h2><span>Конвертер </span> Валют <span role="img" aria-label="euro">&#x1F4B6;</span> </h2>
        <div className="Form">
            <input
        name="amount"
        type="text"
        value={this.state.amount}
        onChange={event =>
        this.setState({ amount: event.target.value })
    }
        />
        <select
        name="from"
        onChange={(event) => this.selectHandler(event)}
        value={this.state.fromCurrency}
    >
        {this.state.currencies.map(cur => (
            <option key={cur}>{cur}</option>
        ))}
    </select>
        <select
        name="to"
        onChange={(event) => this.selectHandler(event)}
        value={this.state.toCurrency}
    >
        {this.state.currencies.map(cur => (
            <option key={cur}>{cur}</option>
        ))}
    </select>
        <button onClick={this.convertHandler}>Конвертировать</button>
        </div>
        {this.state.result &&
        <h3>{this.state.result}</h3>
        }
    </div>
    );
    }
}

export default Converter;