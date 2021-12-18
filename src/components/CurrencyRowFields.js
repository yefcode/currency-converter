const CurrencyRowFields = ({label, amount, currencyOption }) => {
    const currencies = ['BTC', 'ETH', 'USD', 'EUR', 'XRP', 'LTC', 'ADA', 'COP'];
    return (
        <tr>
            <td><div className="label">{label}</div></td>
            <td>
                <input
                    type="number"
                    name={amount.amountName}
                    value={amount.amountValue}
                    disabled={amount.disable}
                    onChange={amount.onChangeAmount}
                />
            </td>
            <td>
                <select
                    value={currencyOption.chosenCurrencyOption}
                    name={currencyOption.currencyOptionName}
                    className="currency-options"
                    onChange={currencyOption.onChangeCurrencyOption}
                >
                    {currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                </select>
            </td>
        </tr>
    )
}

export default CurrencyRowFields