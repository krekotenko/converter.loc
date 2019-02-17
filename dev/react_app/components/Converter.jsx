import React, {Component} from "react";
import axios from "axios";
import Logo from './logo.svg';

class Converter extends Component {
    state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        currencies: [],
        initCurrency: "",
        resultCurrency: "",
        amountResult: 0,
        valueTheSame: null,
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
                this.setState({currencies: currencyAr.sort()})
            })
            .catch(err => {
                console.log("Connect error", err.message);
            });
    }

    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(`/get-rate/${this.state.fromCurrency}/${this.state.toCurrency}`)
                .then(response => {
                    const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                    this.setState({result: result.toFixed(5)})
                    this.setState({resultCurrency: this.state.toCurrency})
                    this.setState({initCurrency: this.state.fromCurrency})
                    this.setState({amountResult: this.state.amount})
                    this.setState({valueTheSame:null})
                })
                .catch(err => {
                    console.log("CURRENCIES ARE THE SAME!", err.message);
                });
        } else {
            this.setState({valueTheSame:"CURRENCIES ARE THE SAME !"})
        }
    };

    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({fromCurrency: event.target.value})
        }
        if (event.target.name === "to") {
            this.setState({toCurrency: event.target.value})
        }
    }

    render() {
        return (
            <div className="converter">
                <Logo className="logo"/>
                <h2 className="currency-converter">Currency Converter</h2>
                <div className="form">
                    <div className="wrapper">
                        <div className="group">
                            <label className='label' htmlFor="input">AMOUNT</label>
                            <input className="input"
                                   name="amount"
                                   type="text"
                                   value={this.state.amount}
                                   onChange={event => this.setState({amount: event.target.value})}/>
                        </div>
                        <div className="group">
                            <label className='label' htmlFor="from">FROM</label>
                            <div className="custom-dropdown">
                                <select
                                    name="from" size="1"
                                    onChange={(event) => this.selectHandler(event)}
                                    value={this.state.fromCurrency}>
                                    {this.state.currencies.map(cur => (
                                        <option key={cur}>{cur}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="group">
                            <label className='label' htmlFor="from">TO</label>
                            <div className="custom-dropdown">
                                <select name="to" size="1" onChange={(event) => this.selectHandler(event)}
                                        value={this.state.toCurrency}>
                                    {this.state.currencies.map(cur => (
                                        <option key={cur}>{cur}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="group">
                            <button onClick={this.convertHandler}><span className="button-text">CONVERT</span></button>
                        </div>
                    </div>
                    {!this.state.result && !this.state.valueTheSame &&
                    <div className="result">
                        <span className="init-currency">SELECT CURRENCIES</span>
                    </div>
                    }
                    {this.state.valueTheSame &&
                    <div className="result">
                        <span className="error">{this.state.valueTheSame}</span>
                    </div>
                    }
                    {this.state.result && !this.state.valueTheSame &&
                    <div className="result">
                        <span className="init-currency">{this.state.amountResult} {this.state.initCurrency} = </span>
                        <h3>{this.state.result} <span className='currency'>{this.state.resultCurrency}</span></h3>
                    </div>
                    }

                </div>
            </div>
        );
    }
}

export default Converter;