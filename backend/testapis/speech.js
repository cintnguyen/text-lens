require('dotenv').config()
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const readline = require("readline");


async function speechText() {
    const audioFile = "YourAudioFile.wav";
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    
    const speechConfig = await sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    // The language of the voice that speaks.
    // speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    speechConfig.speechSynthesisVoiceName = "vi-VN-HoaiMyNeural";
    // speechConfig.speechSynthesisVoiceName = "es-ES-TeoNeural";

    // Create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // rl.question("Enter some text that you want to speak >\n> ", function (text) {
    //     rl.close();
    //     // Start the synthesizer and wait for a result.
    //     synthesizer.speakTextAsync(text,
    //         function (result) {
    //             if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
    //                 console.log("synthesis finished.");
    //             } else {
    //                 console.error("Speech synthesis canceled, " + result.errorDetails +
    //                     "\nDid you set the speech resource key and region values?");
    //             }
    //             synthesizer.close();
    //             synthesizer = null;
    //         },
    //         function (err) {
    //             console.trace("err - " + err);
    //             synthesizer.close();
    //             synthesizer = null;
    //         });
    //     console.log("Now synthesizing to: " + audioFile);
    // });

    // const textToSpeak = "This form is to apply to health insurance";
    const textToSpeak = "Đăng ký bảo hiểm y tế của bạn ở đây"
    // const textToSpeak = "Estaré tarde, este, hay mucho tráfico."

    synthesizer.speakTextAsync(textToSpeak, function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log("Synthesis finished.");
        } else {
            console.error("Speech synthesis canceled, " + result.errorDetails +
                "\nDid you set the speech resource key and region values?");
        }
        synthesizer.close();
        synthesizer = null;
    }, function (err) {
        console.trace("Error - " + err);
        synthesizer.close();
        synthesizer = null;
    });

    console.log("Now synthesizing to: " + audioFile);
};

speechText()
