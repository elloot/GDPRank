class GDPRText {
  constructor(x, y) {
    this.element = document.createElement('span');
    this.styleElement();
    this.element.style.left =
      (x ??
        window.innerWidth / 2 +
          Math.random() * baseFontSize * (Math.random() > 0.5 ? 1 : -1)) + 'px';
    this.element.style.top =
      (y ??
        window.innerHeight / 2 +
          Math.random() * baseFontSize * (Math.random() > 0.5 ? 1 : -1)) + 'px';
    this.xVelocity = Math.random() > 0.5 ? -5 : 5;
    this.yVelocity = Math.random() > 0.5 ? -5 : 5;
    this.sinInput = 0;
  }

  styleElement() {
    this.element.style.position = 'absolute';
    this.element.style.zIndex = '10000';
    this.element.style.fontSize = `${baseFontSize}px`;
    this.element.innerText = 'GDPR';
    this.element.style.transform = 'translateX(-50%) translateY(-50%)';
    this.element.style.pointerEvents = 'none';
    this.element.style.userSelect = 'none';
    this.element.classList.add('rainbow_text_animated');
  }

  getPos() {
    return { x: this.element.offsetLeft, y: this.element.offsetTop };
  }

  setPos(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

const baseFontSize = 200;

const texts = [];

texts.push(new GDPRText());

document.body.appendChild(texts[0].element);

document.addEventListener('click', (e) => {
  texts.push(new GDPRText(e.clientX, e.clientY));
  document.body.appendChild(texts[texts.length - 1].element);
});

const style = document.createElement('style');
style.innerHTML = `
  .rainbow_text_animated {
    background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow_animation 3s infinite;
    background-size: 400% 100%;
  }

  @keyframes rainbow_animation {
    0%,100% {
        background-position: 0 0;
    }

    50% {
        background-position: 100% 0;
    }
  }
`;
document.querySelector('head').appendChild(style);

function animate() {
  texts.forEach((text) => {
    text.setPos(
      text.getPos().x + text.xVelocity,
      text.getPos().y + text.yVelocity
    );

    if (text.getPos().x >= window.innerWidth || text.getPos().x <= 0) {
      text.xVelocity *= -1;
    }

    if (text.getPos().y >= window.innerHeight || text.getPos().y <= 0) {
      text.yVelocity *= -1;
    }

    text.sinInput += 0.02;

    text.element.style.fontSize = `${
      (0.4 * Math.sin(text.sinInput) + 0.8) * baseFontSize
    }px`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
