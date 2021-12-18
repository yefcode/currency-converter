import { useState } from 'react';
import ExchangeRate from "./ExchangeRate";
import CurrencyRowFields from "./CurrencyRowFields";
import axios from "axios";

const CurrencyConverter = () => {

    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    // const [exchangeRate, setExchangeRate] = useState(0);
    // const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC');
    // const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC');
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'USD',
        exchangeRate: 0
    });
    const [result, setResult] = useState(0);

    const amountPrimaryCurrency = {
        amountName:"currency-amount-1",
        amountValue:amount,
        disable:false,
        onChangeAmount:(e) => setAmount(e.target.value),
    }

    const amountSecondaryCurrency = {
        amountName:"currency-amount-2",
        amountValue:result,
        disable:true,
    }

    const primaryCurrencyOption = {
        chosenCurrencyOption:chosenPrimaryCurrency,
        currencyOptionName:"currency-option-1",
        onChangeCurrencyOption:(e) => setChosenPrimaryCurrency(e.target.value),
    }

    const secondaryCurrencyOption = {
        chosenCurrencyOption:chosenSecondaryCurrency,
        currencyOptionName:"currency-option-2",
        onChangeCurrencyOption:(e) => setChosenSecondaryCurrency(e.target.value),
    }

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/currencyConvert',
            params: {from_currency: chosenPrimaryCurrency, to_currency: chosenSecondaryCurrency},
        };

        axios.request(options).then((response) => {
            // setExchangeRate(response.data);
            // setPrimaryCurrencyExchanged(chosenPrimaryCurrency);
            // setSecondaryCurrencyExchanged(chosenSecondaryCurrency);
            
            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
            });

            setResult(response.data * amount);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <CurrencyRowFields
                            label="From"
                            amount={amountPrimaryCurrency}
                            currencyOption={primaryCurrencyOption}
                        />
                        <CurrencyRowFields
                            label="to"
                            amount={amountSecondaryCurrency}
                            currencyOption={secondaryCurrencyOption}
                        />
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate
                exchangeData={exchangedData}
            />
        </div>
    );
}

export default CurrencyConverter;