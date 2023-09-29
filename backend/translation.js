require('dotenv').config()
const { v4: uuidv4 } = require('uuid');


// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.



const translationTest = async () => {
    let endpoint = "https://api.cognitive.microsofttranslator.com";
    let location = "eastus";
    const fromLang = 'en'
    const toLang = 'vi'

    const response = await fetch(endpoint + `/translate?api-version=3.0&from=${fromLang}&to=${toLang}`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATION_KEY,
            // location required if you're using a multi-service or regional (not global) resource.ß
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString(),
        },
        body: JSON.stringify([{
            'text': 'Apply here for your health insurance!'
        }]),
    })
    const translationText = await response.json();
    console.log(JSON.stringify(translationText))
}

translationTest()

