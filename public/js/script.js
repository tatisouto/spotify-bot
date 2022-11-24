'use strict';
// Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-GB';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const outputYou = document.querySelector('.output-you');
document.querySelector('.playlist').style.visibility = "hidden";

// Add event listener - start recognition
document.querySelector('button').addEventListener('click', () => {
  recognition.start();
 });

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');
  
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;  
 
  outputYou.textContent = text;
  console.log('Speech recognition confidence: ' + e.results[0][0].confidence);
  
 
  // Call emotion detection API
  const getEmotion = fetch('https://emotion-detection-api-c7aaatrzsq-ew.a.run.app/predict?text=' + text);

  getEmotion
  .then((response) => response.json())
  .then((data) => {

     // Log the emotion
    const emotion = data['label'];
    console.log('Emotion' + emotion);   

    const score = data['score'];
    console.log('score' + score);

    /// Display playlists
    switch(emotion) {
      case 'joy':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/37i9dQZF1EM6boaT9qOTSA?utm_source=generator";
        break;
      case 'love':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/37i9dQZF1EM6boaT9qOTSA?utm_source=generator";
        break;
      case 'anger':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/37i9dQZF1EM6boaT9qOTSA?utm_source=generator";
      break;
      case 'fear':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/37i9dQZF1EM6boaT9qOTSA?utm_source=generator"; 
      break;
      case 'surprise':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/3CkJH2FzvJciO8UmkzHCMU?utm_source=generator";
      break;
      case 'sadness':
        document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1?utm_source=generator";
      break;
    }
    document.querySelector('.playlist').style.visibility = "visible";
  
  })
  .catch((error) => {
    console.error(error);
  });;
});


recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  console.log('Error: ' + e.error);
});
