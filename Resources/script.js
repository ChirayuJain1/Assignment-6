document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  const textInput = createTextInput();
  const submitButton = createSubmitButton(textInput);

  root.appendChild(textInput);
  root.appendChild(submitButton);

  const helpButton = createHelpButton();
  root.appendChild(helpButton);
});

function showExplanation() {
  alert("This program analyzes the word frequency in the text you input. Enter your text in the provided box, and click 'Submit' to see the frequency of each word.");
}

function hideExplanation() {
  // Empty function for now, as we don't need to do anything when hiding explanation
}

function createTextInput() {
  const textarea = createEl('textarea', { placeholder: 'Enter your text here...', id: 'textInput' }, 'input-box');
  textarea.style.width = '100%'; // Set the width to 100% of its container
  textarea.style.height = '200px'; // Set the height to 200 pixels
  return textarea;
}

function createHelpButton() {
  const helpButton = createEl('button', { textContent: 'Help', id: 'helpBtn' }, 'help-button');
  helpButton.addEventListener('mouseover', showExplanation);
  helpButton.addEventListener('mouseout', hideExplanation);
  return helpButton;
}

function createSubmitButton(textInput) {
  const submitButton = createEl('button', { textContent: 'Submit', id: 'submitBtn' }, 'submit-button');
  submitButton.addEventListener('click', function () {
      const text = textInput.value.trim();
      const freqTable = calculateFrequency(text);
      renderTopWords(freqTable);
  });
  return submitButton;
}

function calculateFrequency(text) {
  return text.split(/\s+/).reduce((table, word) => {
      table[word] = (table[word] || 0) + 1;
      return table;
  }, {});
}

function renderTopWords(freqTable) {
  const root = document.getElementById('root');
  const topWords = Object.entries(freqTable).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const resultDiv = createEl('div', { id: 'result' });
  const table = createEl('table');
  table.innerHTML = `<tr><th>Word</th><th>Frequency</th></tr>`;
  topWords.forEach(([word, freq]) => {
      table.innerHTML += `<tr><td>${word}</td><td>${freq}</td></tr>`;
  });
  resultDiv.appendChild(table);
  root.appendChild(resultDiv);
}

function createEl(tag, props, className) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  if (className) {
      el.classList.add(className);
  }
  return el;
}
