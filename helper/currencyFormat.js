function currencyFormat(value) {
    return value.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});
}

module.exports = currencyFormat;