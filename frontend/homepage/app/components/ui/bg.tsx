import React from 'react';
import p5 from 'p5';

interface MoodSetting {
  hue: number;
  saturation: number;
  brightness: number;
  speed: number;
  style: string;
}

interface MoodProperties {
  hue: number;
  speed: number;
  size: number;
}

interface MoodMap {
  [key: string]: MoodProperties;
}

let blobs: BlobbyShape[] = [];
let activeMoods: string[] = ["curious", "anxious", "peaceful"];
let moodProps: MoodProperties;
let p: p5;

const moodSettings: { [key: string]: MoodSetting } = {
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

const moodMap: MoodMap = {
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

class BlobbyShape {
  private x: number;
  private y: number;
  private baseSize: number;
  private phase: number;
  private speed: number;
  private rotation: number;
  private points: number;
  private noiseSeed: number;
  private floatDirection: p5.Vector;
  private alphaPhase: number;

  constructor(p: p5) {
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    this.baseSize = p.random(50, 120);
    this.phase = p.random(360);
    this.speed = p.random(0.3, 1.2);
    this.rotation = p.random(360);
    this.points = p.int(p.random(6, 12));
    this.noiseSeed = p.random(1000);
    this.floatDirection = p5.Vector.random2D().mult(p.random(0.2, 0.7));
    this.alphaPhase = p.random(1000);
  }

  update(p: p5): void {
    this.phase += moodProps.speed;
    this.rotation += moodProps.speed * 0.4;
    this.x += this.floatDirection.x;
    this.y += this.floatDirection.y;

    if (this.x > p.width + 100) this.x = -100;
    if (this.x < -100) this.x = p.width + 100;
    if (this.y > p.height + 100) this.y = -100;
    if (this.y < -100) this.y = p.height + 100;
  }

  display(p: p5): void {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotation);

    const alpha = 60 + p.sin(this.phase + this.alphaPhase) * 40;
    p.fill(moodProps.hue, 80, 100, alpha);

    const pulseSize = this.baseSize * moodProps.size + p.sin(this.phase) * 10;

    p.beginShape();
    for (let i = 0; i < this.points; i++) {
      const angle = p.map(i, 0, this.points, 0, 360);
      const r = pulseSize + p.sin(angle * 3 + this.phase) * 15 * p.noise(this.noiseSeed + p.frameCount * 0.01);
      const px = p.cos(angle) * r;
      const py = p.sin(angle) * r;
      p.curveVertex(px, py);
    }
    p.endShape(p.CLOSE);
    p.pop();
  }
}

function getBlendedMoodProperties(moodList: string[]): MoodProperties {
  const total = moodList.length;
  let hue = 0, speed = 0, size = 0;

  for (const mood of moodList) {
    const props = moodMap[mood.toLowerCase()] || { hue: 180, speed: 1.0, size: 1.0 };
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

export const BlobBackground: React.FC = () => {
  React.useEffect(() => {
    let blobs: BlobbyShape[] = [];
    let activeMoods: string[] = ["curious", "anxious", "peaceful"];
    let moodProps: MoodProperties;
    let p: p5;

    // Create a new p5 instance
    new p5((p5Instance: p5) => {
      p = p5Instance;

      p.setup = () => {
        const canvas = p.createCanvas(800, 600);
        canvas.parent('p5-container');
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();

        moodProps = getBlendedMoodProperties(activeMoods);

        for (let i = 0; i < 35; i++) {
          blobs.push(new BlobbyShape(p));
        }
      };

      p.draw = () => {
        p.background(20, 10, 95, 6);
        moodProps = getBlendedMoodProperties(activeMoods);

        for (const blob of blobs) {
          blob.update(p);
          blob.display(p);
        }
      };
    });

    // Cleanup function
    return () => {
      if (p) {
        p.remove();
      }
    };
  }, []);

  return <div id="p5-container" style={{ width: '100%', height: '100%' }} />;
};

export {};