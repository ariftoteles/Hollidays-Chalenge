function dateFormat(date){
    return new Date(date + "UTC").toISOString().slice(0, 10)
}

module.exports = dateFormat;