
const weatherForm = document.querySelector('form');
const search = document.querySelector('.address');
const error = document.querySelector('.error');

const success = document.querySelector('.success')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value;
    error.textContent = 'Loading ...'
    success.textContent = ''
    if (!address) {
        console.log("Uh oh! No address is provided");
        error.textContent = "Uh oh! No address is provided"
    } else {
        fetch('/weather?address=' + address).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    error.textContent = data.error
                } else {
                    error.textContent = 'Address: ' + data.location
                    success.textContent = ' Forecast: ' + data.forecast
                }
            })
        })
    }

})

