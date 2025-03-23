// === Dynamic Emotion-Based Blob Animation ===
 
let blobs = [];
let activeMoods = ["curious", "anxious", "peaceful"];
let moodProps;

const moodMap = {
  "joyful": {
    "hue": 10,
    "speed": 0.81,
    "size": 0.87
  },
  "peaceful": {
    "hue": 264,
    "speed": 1.65,
    "size": 1.22
  },
  "anxious": {
    "hue": 321,
    "speed": 1.47,
    "size": 0.96
  },
  "angry": {
    "hue": 16,
    "speed": 1.9,
    "size": 0.78
  },
  "melancholy": {
    "hue": 346,
    "speed": 1.79,
    "size": 1.14
  },
  "excited": {
    "hue": 162,
    "speed": 0.95,
    "size": 1.37
  },
  "calm": {
    "hue": 198,
    "speed": 0.88,
    "size": 0.86
  },
  "curious": {
    "hue": 175,
    "speed": 0.76,
    "size": 1.12
  },
  "sad": {
    "hue": 227,
    "speed": 1.25,
    "size": 0.99
  },
  "energetic": {
    "hue": 132,
    "speed": 1.32,
    "size": 1.46
  },
  "tired": {
    "hue": 101,
    "speed": 1.91,
    "size": 1.37
  },
  "focused": {
    "hue": 317,
    "speed": 0.89,
    "size": 0.85
  },
  "nervous": {
    "hue": 268,
    "speed": 1.85,
    "size": 0.72
  },
  "content": {
    "hue": 358,
    "speed": 1.29,
    "size": 1.34
  },
  "confident": {
    "hue": 241,
    "speed": 1.44,
    "size": 0.91
  },
  "hopeless": {
    "hue": 303,
    "speed": 1.34,
    "size": 1.11
  },
  "hopeful": {
    "hue": 330,
    "speed": 1.16,
    "size": 0.83
  },
  "bored": {
    "hue": 231,
    "speed": 1.51,
    "size": 1.17
  },
  "serene": {
    "hue": 7,
    "speed": 0.78,
    "size": 1.41
  },
  "overwhelmed": {
    "hue": 250,
    "speed": 1.7,
    "size": 1.35
  }
};

const moodSettings = {
    "joyful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "happy": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "cheerful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "chipper": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "amused": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "upbeat": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "delighted": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "thrilled": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "excited": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "bubbly": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "content": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "satisfied": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "optimistic": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "grateful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "playful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "lively": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "blissful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "exuberant": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "giddy": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "jubilant": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "merry": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "zestful": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "sunny": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "vivacious": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "laughing": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "grinning": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "chuffed": { hue: 50, saturation: 90, brightness: 100, speed: 1.2, style: 'float' },
    "relaxed": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "calm": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "peaceful": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "serene": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "composed": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "zen": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "unruffled": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "chill": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "easygoing": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "comfortable": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "meditative": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "mellow": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "carefree": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "contented": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "unperturbed": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "safe": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "settled": { hue: 180, saturation: 30, brightness: 90, speed: 0.4, style: 'slow' },
    "angry": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "annoyed": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "irritated": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "infuriated": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "frustrated": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "enraged": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "outraged": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "agitated": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "hostile": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "resentful": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "cross": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "grumpy": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "touchy": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "temperamental": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "impatient": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "snappy": { hue: 0, saturation: 100, brightness: 80, speed: 2.0, style: 'jitter' },
    "sad": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "melancholy": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "gloomy": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "depressed": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "blue": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "mournful": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "heartbroken": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "morose": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "sorrowful": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "wistful": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "crying": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "glum": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "unhappy": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "hopeless": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "lonely": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "low": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "dejected": { hue: 230, saturation: 40, brightness: 70, speed: 0.6, style: 'drip' },
    "anxious": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "nervous": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "afraid": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "scared": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "fearful": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "insecure": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "uneasy": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "petrified": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "alarmed": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "jumpy": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "tense": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "jittery": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "worried": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "distressed": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "threatened": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "panicked": { hue: 290, saturation: 90, brightness: 80, speed: 1.8, style: 'jitter' },
    "curious": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "interested": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "engaged": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "enthusiastic": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "inspired": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "thoughtful": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "introspective": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "contemplative": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "philosophical": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "fascinated": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "absorbed": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "studious": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
    "reflective": { hue: 280, saturation: 60, brightness: 90, speed: 1.0, style: 'spiral' },
  };

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  moodProps = getBlendedMoodProperties(activeMoods);

  for (let i = 0; i < 35; i++) {
    blobs.push(new BlobbyShape());
  }
}

function draw() {
  background(20, 10, 95, 6);
  moodProps = getBlendedMoodProperties(activeMoods);

  for (let blob of blobs) {
    blob.update();
    blob.display();
  }
}

function getBlendedMoodProperties(moodList) {
  let total = moodList.length;
  let hue = 0, speed = 0, size = 0;

  for (let mood of moodList) {
    let props = moodMap[mood.toLowerCase()] || { hue: 180, speed: 1.0, size: 1.0 };
    hue += props.hue;
    speed += props.speed;
    size += props.size;
  }

  return {
    hue: hue / total,
    speed: speed / total,
    size: size / total
  };
}

class BlobbyShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.baseSize = random(50, 120);
    this.phase = random(360);
    this.speed = random(0.3, 1.2);
    this.rotation = random(360);
    this.points = int(random(6, 12));
    this.noiseSeed = random(1000);
    this.floatDirection = p5.Vector.random2D().mult(random(0.2, 0.7));
    this.alphaPhase = random(1000);
  }

  update() {
    this.phase += moodProps.speed;
    this.rotation += moodProps.speed * 0.4;
    this.x += this.floatDirection.x;
    this.y += this.floatDirection.y;

    if (this.x > width + 100) this.x = -100;
    if (this.x < -100) this.x = width + 100;
    if (this.y > height + 100) this.y = -100;
    if (this.y < -100) this.y = height + 100;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    let alpha = 60 + sin(this.phase + this.alphaPhase) * 40;
    fill(moodProps.hue, 80, 100, alpha);

    let pulseSize = this.baseSize * moodProps.size + sin(this.phase) * 10;

    beginShape();
    for (let i = 0; i < this.points; i++) {
      let angle = map(i, 0, this.points, 0, 360);
      let r = pulseSize + sin(angle * 3 + this.phase) * 15 * noise(this.noiseSeed + frameCount * 0.01);
      let px = cos(angle) * r;
      let py = sin(angle) * r;
      curveVertex(px, py);
    }
    endShape(CLOSE);
    pop();
  }
}