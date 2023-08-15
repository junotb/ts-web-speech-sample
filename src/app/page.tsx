"use client";

export default function Home() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const handleClick = () => {
    recognition.start();
    renderState('Ready to receive a color command.');
  }

  const renderState = (state: string) => {
    document.getElementById('state')!.innerHTML = state;
  }

  recognition.onresult = function(event: any) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object

    renderState('Result Received: ' + event.results[0][0].transcript);
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event: any) {
    renderState('I didn\'t recognise that color');
  }

  recognition.onerror = function(event: any) {
    renderState('Error occurred in recognition: ' + event.error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div
        id="state"
        className="p-4 w-96 bg-white text-black"
      >Speak Something...</div>
      <button
        type="button"
        className="font-semibold text-lg border-2 p-4 hover:border-neutral-500 hover:text-neutral-500 shadow-lg shadow-white hover:shadow-neutral-500 rounded-lg"
        onClick={handleClick}
      >Speak</button>
    </main>
  )
}
