import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

//properties from the react object

// javascript is async which will finish at an unknwon time in the future (can be inconvenient)
// when we get data from server, we will change state so we use it inside of a useEffect, it can be done at a time that wont cause problems
// fetching data in react we will use useEffect
// new way theres library called request

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [translationLang, setTranslationLang] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  console.log("TRNASLATIONALNG", translationLang)


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchSummary = async () => {
    const formData = new FormData();
    formData.append('ocrImageFile', file);

    try {
      const ocrResponse = await fetch('http://localhost:8000/ocr', {
        method: 'POST',
        body: formData,
      });

      let ocrData = null
      if (ocrResponse.ok) {
        ocrData = await ocrResponse.json();
      } else {
        console.error('Error uploading image.');
        return null;
      }

      const summaryResponse = await fetch('http://localhost:8000/aisummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textToSummarize: ocrData.ocrResult }),
      });

      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        setSummary(summaryData.summary);
        return summaryData.summary
      } else {
        console.error('Error getting summary.');
        return null
      }

    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  const fetchTranslation = async (text) => {
    const translationResponse = await fetch('http://localhost:8000/translation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textToTranslate: text, fromLang: "en", toLang: translationLang })
    });

    if (translationResponse.ok) {
      const translationData = await translationResponse.json();
      console.log("TRANSLATION", translationData.translation[0].translations[0].text)
      setTranslation(translationData.translation[0].translations[0].text);
    } else {
      console.error('Error getting translation.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAudioFile(null)

    if (file && translationLang) {
      const summary = await fetchSummary();
      if (summary) {
        fetchTranslation(summary);
      }
    } else {
      console.error('No file selected.');
    }
  }

  const readSummary = async () => {
    try {
      const response = await fetch("http://localhost:8000/speech", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lang: translationLang, textToSpeak: translation }),
      });
      const blob = await response.blob()
      console.log("BLOB", blob)
      const dataUrl = URL.createObjectURL(blob)
      setAudioFile(dataUrl)

      
      console.log("DATAURL",dataUrl)
    } catch (error) {
      console.error('Error fetching and playing WAV file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose an image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <select
          onChange={(e) => setTranslationLang(e.target.value)}
          value={translationLang}
        >
          <option value="" disabled="disabled">Select a translation language:</option>
          <option value="vi">Vietnamese</option>
          <option value="es">Spanish</option>
          <option value="zh">Chinese</option>
          <option value="en">English</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {summary && (
        <div>
          <div>
            <h2>Summary Result:</h2>
            <p>{summary}</p>
          </div>
        </div>

      )}

      {translation && (
        <div>
          <h2>Translation:</h2>
          <p>{translation}</p>

          <div>
            <button onClick={readSummary}>Read Summary</button>
          </div>
        </div>
      )}

      {audioFile && (
       <ReactAudioPlayer
       src={audioFile}
       autoPlay
       controls
     />
      )}
    </div>
  )
};


export default App;
