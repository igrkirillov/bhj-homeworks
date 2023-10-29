class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timer = container.querySelector(".timer");
    this.timerIntervalId = null;
    // Ctrl, Alt, Shift, CapsLock
    this.skippingKeys = ["Control", "Alt", "Shift", "CapsLock", "GroupNext"];

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    window.addEventListener("keydown", keyEvent => {
      if (this.skippingKeys.includes(keyEvent.key)) {
        // пропускаем обработку если нажата клавиша из skippingKeys
        return;
      }
      const typedSymbol = keyEvent.key;
      if (typedSymbol.toUpperCase() === this.currentSymbol.textContent.toUpperCase()) {
        this.success()
      } else {
        this.fail();
      }
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      this.stopTimer();
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    const timerHandler = () => {
      let remainingSecs = +this.timer.textContent;
      --remainingSecs;
      this.timer.textContent = "" + remainingSecs;
      if (remainingSecs <= 0) {
        this.stopTimer();
        this.fail();
      }
    };
    const game = this;
    this.timerIntervalId = setInterval(() => timerHandler.call(game), 1000);
  }

  stopTimer() {
    if (this.timerIntervalId !== null) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
  }

  getWord() {
    const words = [
        'я люблю kitkat',
        'I am адепт'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) => {
            const id = s !== " " ? "char" : "space";
            return `<span id=${id} class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`;
        })
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    this.timer.textContent = word.length;
  }
}

new Game(document.getElementById('game'))

