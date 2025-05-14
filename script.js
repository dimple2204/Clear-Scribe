window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const clearBtn = document.getElementById('clear-btn');
    const output = document.getElementById('output');
    const spinner = document.getElementById('spinner');
    const themeSwitch = document.getElementById('theme-switch');

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        output.value = 'Listening...';
        output.classList.add('listening');
        startBtn.classList.add('listening');
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        output.classList.remove('listening');
        startBtn.classList.remove('listening');
    });

    clearBtn.addEventListener('click', () => {
        output.value = '';
        output.focus();
    });

    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        output.value = transcript;
    });

    recognition.addEventListener('end', () => {
        if (!stopBtn.disabled) {
            recognition.start();
        } else {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            output.classList.remove('listening');
            startBtn.classList.remove('listening');
        }
    });

    recognition.addEventListener('error', (event) => {
        output.value = 'Error occurred: ' + event.error;
        output.classList.remove('listening');
        startBtn.classList.remove('listening');
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light');
    });

    
    output.addEventListener('input', () => {
        
    });
} else {
    const output = document.getElementById('output');
    output.value = 'Sorry, your browser does not support the Web Speech API.';
    document.getElementById('start-btn').disabled = true;
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('clear-btn').disabled = true;
}