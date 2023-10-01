const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const { v4: uuidv4 } = require('uuid');

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const readline = require("readline");

module.exports = {
    postOcr: async (req, res) => {
        const ocrUrl = 'https://ocr-cn.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview'

        // const data = {url:imageUrl}
        // console.log(JSON.stringify(data))

        console.log(req.file.path)
        const imageFile = fs.readFileSync(req.file.path);


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
        res.json({ ocrResult: ocrText.readResult.content })
    },

    ocrTest: (req, res) => {
        res.send(`
        <form action="/ocr" method="post" enctype="multipart/form-data" >
            <input name="ocrImageFile" type="file"></input>
            <button type="submit">Submit</button>
        </form>
        `)
    },

    postAiSummary: async (req, res) => {
        console.log(req.body)
        const configuration = new Configuration({
            organization: "org-vMpv1b4Blv47JzS7bQJlSnf5",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        console.log(process.env.OPENAI_API_KEY)

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Summarize this ${req.body.textToSummarize}` }],
        });
        let response = completion.data.choices[0].message
        console.log(response.content)

        res.json({ summary: response.content })
    },
    //aisummary test
    //curl -X POST -H "Content-Type: application/json" -d '{"textToSummarize": "Apply here for health insurance"}'  http://localhost:8000/aisummary

    postTranslation: async (req, res) => {
        console.log(req.body)
        let endpoint = "https://api.cognitive.microsofttranslator.com";
        let location = "eastus";
        const fromLang = req.body.fromLang
        const toLang = req.body.toLang

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
                'text': req.body.textToTranslate
            }]),
        })
        const translationText = await response.json();
        console.log(JSON.stringify(translationText))

        res.json({ translation: translationText })
    },
    //translation test
    //curl -X POST -H "Content-Type: application/json" -d '{"fromLang": "en", "toLang": "vi", "textToTranslate":"Apply here for health insurance!"}'  http://localhost:8000/translation

    postSpeech: async (req, res) => {
        const audioFile = "YourAudioFile.wav";
        // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"

        const speechConfig = await sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
        const audioConfig = await sdk.AudioConfig.fromAudioFileOutput(audioFile);

        const langToVoiceName = {
            vi: "vi-VN-HoaiMyNeural",
            en: "en-US-JennyNeural",
            es: "es-ES-TeoNeural",
        }
        speechConfig.speechSynthesisVoiceName = langToVoiceName[req.body.lang]

        // Create the speech synthesizer.
        let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        const textToSpeak = req.body.textToSpeak

        synthesizer.speakTextAsync(textToSpeak, function (result) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("Synthesis finished.");
                // res.sendFile(__dirname, audioFile);
                res.sendFile(audioFile, {root: __dirname })
            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you set the speech resource key and region values?");
                res.status(500).send(result.errorDetails);
            }
            synthesizer.close();
            synthesizer = null;
        }, function (err) {
            console.trace("Error - " + err);
            synthesizer.close();
            synthesizer = null;
        });

        console.log("Now synthesizing to: " + audioFile);

    },
    //to test speech
    // curl -X POST -H "Content-Type: application/json" -d '{"lang": "vi", "textToSpeak":"Đăng ký bảo hiểm y tế của bạn ở đây"}'  http://localhost:8000/speech >test.wav
};

