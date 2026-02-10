
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="lotto-numbers"></div>
      <button>Generate</button>
    `;

    shadow.appendChild(wrapper);

    // Link to the main stylesheet to inherit CSS variables
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');
    shadow.appendChild(linkElem);

    this.generateNumbers();

    shadow.querySelector('button').addEventListener('click', () => {
      this.generateNumbers();
    });
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.lotto-numbers');
    numbersContainer.innerHTML = '';
    const numbers = new Set();

    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of [...numbers].sort((a, b) => a - b)) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.textContent = number;
      numbersContainer.appendChild(numberElement);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply theme
    function applyTheme(theme) {
        body.classList.remove('dark-mode', 'light-mode'); // Remove both to ensure only one is applied
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
        }
        // No need to add 'light-mode' class, as light mode is default styles
    }

    // Check for saved theme preference
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        // If no preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark-mode';
        } else {
            currentTheme = 'light-mode';
        }
    }
    applyTheme(currentTheme);


    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            applyTheme('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});
