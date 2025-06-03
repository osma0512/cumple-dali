document.addEventListener('DOMContentLoaded', function() {
  // Frases arriba
  const eyeQuotes = [
    "Tus ojos marrones oscuros son mi noche favorita.",
    "En tus ojos encuentro el universo entero.",
    "Tus ojos, dos luceros en la oscuridad.",
    "Cada vez que miro tus ojos, me pierdo en su profundidad.",
    "Tus ojos son como chocolate bajo la luna.",
    "No hay noche más bonita que la de tus ojos mirándome.",
    "Tus ojos oscuros guardan todos mis sueños.",
    "En tus ojos, la calma y el misterio de la noche."
  ];
  let quoteIndex = 0;
  const eyeQuotesBox = document.getElementById('eyeQuotesBox');
  if (eyeQuotesBox) eyeQuotesBox.style.display = 'none';

  // Luna y estrellas
  function showMoon() {
    const moon = document.getElementById('moon');
    if (moon) moon.style.display = 'block';
  }
  // Estrellas con aparición gradual
  function createStars(n) {
    const starContainer = document.getElementById('starContainer');
    if (!starContainer) return;
    starContainer.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.left = Math.random() * 100 + 'vw';
      starContainer.appendChild(star);
      setTimeout(() => star.classList.add('visible'), 300 + Math.random() * 1200);
    }
  }

  // Interactividad de la luna: rebota al acercar el mouse
  const moon = document.getElementById('moon');
  let moonExcited = false;

  document.addEventListener('mousemove', function(e) {
    if (!document.body.classList.contains('night')) return;
    if (!moon) return;
    const rect = moon.getBoundingClientRect();
    const moonCenterX = rect.left + rect.width / 2;
    const moonCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - moonCenterX;
    const dy = e.clientY - moonCenterY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 100 && !moonExcited) {
      moon.classList.add('excited');
      moonExcited = true;
    } else if (dist >= 100 && moonExcited) {
      moon.classList.remove('excited');
      moonExcited = false;
    }
  });

  // Frases y fases de la luna (emojis y frases personalizadas)
  const moonFases = [
    "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"
  ];
  const moonFrases = [
    "Tus ojos marrones llenan mi noche como la luna llena.",
    "Tus ojos guardan secretos como la luna gibosa menguante.",
    "Tus ojos, misteriosos como el cuarto menguante.",
    "Tus ojos oscuros me envuelven como la luna menguante.",
    "Tus ojos, tan profundos como la luna nueva.",
    "Tus ojos despiertan mi mundo como la luna creciente.",
    "Tus ojos, dos lunas creciendo en la oscuridad.",
    "Tus ojos iluminan mi noche como la luna gibosa creciente."
  ];
  let lastMoonIndex = -1;
  const moonQuoteDiv = document.getElementById('moonQuote');
  const moonPhaseDiv = document.getElementById('moonPhaseImg');
  const moonModal = document.getElementById('moonModal');
  let starCount = 0;
  const starCountSpan = document.getElementById('starCount');
  moon.addEventListener('click', function(e) {
    let moonIndex;
    do {
      moonIndex = Math.floor(Math.random() * moonFases.length);
    } while (moonIndex === lastMoonIndex);
    lastMoonIndex = moonIndex;
    moonQuoteDiv.textContent = moonFrases[moonIndex];
    moonPhaseDiv.innerHTML = `<span style="font-size:48px;">${moonFases[moonIndex]}</span>`;
    moonModal.classList.add('show');
    starCount++;
    if (starCountSpan) starCountSpan.textContent = starCount;
    e.stopPropagation();
  });
  // Inicializa el modal con una fase/frase aleatoria al cargar
  (function(){
    const moonIndex = Math.floor(Math.random() * moonFases.length);
    lastMoonIndex = moonIndex;
    moonQuoteDiv.textContent = moonFrases[moonIndex];
    moonPhaseDiv.innerHTML = `<span style="font-size:48px;">${moonFases[moonIndex]}</span>`;
  })();

  // Modal para fotos y videos
  document.querySelectorAll('.media img, .media video').forEach(media => {
    media.addEventListener('click', function(e) {
      const modal = document.getElementById('mediaModal');
      const modalInner = document.getElementById('mediaModalInner');
      const modalMsg = document.getElementById('mediaModalMessage');
      modalInner.innerHTML = '';
      const clone = this.cloneNode(true);
      if (clone.tagName === 'VIDEO') clone.controls = true;
      clone.style.borderRadius = '16px';
      modalInner.appendChild(clone);
      const msgDiv = this.parentElement.nextElementSibling;
      modalMsg.textContent = msgDiv && msgDiv.classList.contains('media-message') ? msgDiv.textContent : '';
      modal.style.display = 'flex';
      e.stopPropagation();
    });
  });
  // Cerrar modal
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('mediaModal');
    if (modal && e.target === modal) modal.style.display = 'none';
  });
  // Cerrar modal de la luna
  document.getElementById('moonModalClose').addEventListener('click', function() {
    moonModal.classList.remove('show');
  });
  moonModal.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('show');
  });

  // --- SOLO el código de abrir la caja y transición de noche va aquí ---
  document.getElementById('boxContainer').addEventListener('click', function() {
    document.getElementById('boxLid').classList.add('open');
    document.getElementById('ribbonH').classList.add('open');
    document.getElementById('ribbonV').classList.add('open');
    document.querySelector('.bow').classList.add('open');
    setTimeout(function() {
      document.getElementById('boxContainer').style.display = 'none';
      document.getElementById('plantContainer').style.display = 'block';
      const branches = document.querySelectorAll('.branch');
      branches.forEach((branch, i) => {
        setTimeout(() => {
          branch.classList.add('show');
        }, i * 350);
      });
      // --- Transición mágica ---
      setTimeout(function() {
        document.body.classList.add('night');
        // El sol se oculta por CSS
        // El overlay sube opacidad por CSS
        // La luna aparece por CSS
        createStars(60); // Estrellas aparecen poco a poco
        // Mostrar frases arriba
        if (eyeQuotesBox) {
          eyeQuotesBox.style.display = 'block';
          eyeQuotesBox.textContent = eyeQuotes[quoteIndex];
          setInterval(() => {
            quoteIndex = (quoteIndex + 1) % eyeQuotes.length;
            eyeQuotesBox.textContent = eyeQuotes[quoteIndex];
          }, 4000);
        }
      }, 1200);
    }, 1800);

    // Flor central se mueve
    document.getElementById('centralFlower').style.animation = "flowerSway 3s infinite ease-in-out";
  });

  // Mensaje de cumpleaños: desvanecer y ocultar
  const birthdayMsg = document.getElementById('birthdayMessage');
  if (birthdayMsg) {
    birthdayMsg.classList.add('fade-out');
    setTimeout(() => {
      birthdayMsg.style.display = 'none';
    }, 1200); // Debe coincidir con el transition del CSS
  }

  const starCounter = document.getElementById('starCounter');
  if (starCounter) starCounter.style.display = 'block';

  function launchShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    // Posición aleatoria en la parte superior del cielo
    star.style.top = (Math.random() * 40 + 10) + 'vh';
    star.style.left = (Math.random() * 60 + 10) + 'vw';
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 1300);
  }

  // Lanza una estrella fugaz cada 5-12 segundos aleatoriamente
  function startShootingStars() {
    setInterval(() => {
      if (document.body.classList.contains('night')) {
        launchShootingStar();
      }
    }, Math.random() * 7000 + 5000);
  }
  startShootingStars();
});