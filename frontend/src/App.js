import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import Image from './image.jsx';

//properties from the react object

// javascript is async which will finish at an unknwon time in the future (can be inconvenient)
// when we get data from server, we will change state so we use it inside of a useEffect, it can be done at a time that wont cause problems
// fetching data in react we will use useEffect
// new way theres library called request

function App() {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('ocrImageFile', file);

      try {
        const response = await fetch('http://localhost:8000/ocr', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setOcrResult(data.ocrResult);
        } else {
          console.error('Error uploading image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose an image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {ocrResult && (
        <div>
          <h2>OCR Result:</h2>
          <p>{ocrResult}</p>
        </div>
      )}
    </div>
  )
};


export default App;
