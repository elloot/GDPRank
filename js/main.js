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
    this.xVelocity = Math.random() > 0.5 ? -10 : 10;
    this.yVelocity = Math.random() > 0.5 ? -10 : 10;
    this.sinInput = 0;
  }

  styleElement() {
    this.element.style.position = 'absolute';
    this.element.style.zIndex = '10000';
    this.element.style.color = 'red';
    this.element.style.fontSize = `${baseFontSize}px`;
    this.element.innerText = 'GDPR';
    this.element.style.transform = 'translateX(-50%) translateY(-50%)';
    this.element.style.pointerEvents = 'none';
    this.element.style.userSelect = 'none';
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

function animate() {
  texts.forEach((text) => {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    text.element.style.color = `rgb(${r}, ${g}, ${b})`;

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

    text.sinInput += 0.03;

    text.element.style.fontSize = `${
      (0.4 * Math.sin(text.sinInput) + 0.8) * baseFontSize
    }px`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.addEventListener('click', (e) => {
  texts.push(new GDPRText(e.clientX, e.clientY));
  document.body.appendChild(texts[texts.length - 1].element);
});
