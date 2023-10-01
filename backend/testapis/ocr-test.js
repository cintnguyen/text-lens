require('dotenv').config()
const fs = require('fs');

const ocrtest = async () => {
    const ocrUrl = 'https://ocr-cn.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview'
    const imageUrl = 'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'
    // const data = {url:imageUrl}
    // console.log(JSON.stringify(data))

    const imageFile = fs.readFileSync('imagetest.jpeg');

    const buffer = Buffer.from(imageFile);

    const response = await fetch(ocrUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            //"Content-Type": "application/json",
            "Content-Type": "image/jpeg",
            "Ocp-Apim-Subscription-Key": process.env.AZURE_OCR_KEY,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify({url:imageUrl}), // body data type must match "Content-Type" header
        body: buffer,
    });
    const ocrText = await response.json(); // parses JSON response into native JavaScript objects
    console.log(ocrText.readResult.content)

}

ocrtest()

// curl.exe -H "Ocp-Apim-Subscription-Key: <subscriptionKey>" -H "Content-Type: application/json" "https://<endpoint>/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview" -d "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"