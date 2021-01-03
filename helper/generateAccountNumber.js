function generateAccountNumber(){
    return String(new Date().valueOf()).split('').splice(3).join('')
}

module.exports = generateAccountNumber