import vocabularySheet from '../assets/generated/vocabulary.png';
import vocabularySheet2 from '../assets/generated/vocabulary-2.png';
import vocabularySheet3 from '../assets/generated/vocabulary-3.png';
import starImage from '../assets/generated/star.png';
import snowImage from '../assets/generated/snow.png';

const spriteOrder = [
  'apple', 'ball', 'cat', 'dog', 'elephant',
  'fish', 'giraffe', 'hat', 'ice cream', 'juice',
  'kite', 'lion', 'moon', 'nest', 'orange',
  'pizza', 'queen', 'rabbit', 'sun', 'tiger',
];

const spriteOrder2 = [
  'banana', 'carrot', 'cake', 'bird', 'car',
  'doll', 'robot', 'teddy bear', 'shirt', 'shoes',
  'dress', 'jacket', 'socks', 'book', 'pen',
  'pencil', 'bag', 'ruler', 'chair', 'frog',
];

const spriteOrder3 = [
  'fire', 'cloud', 'leaf', 'mouse', 'water',
  'sand', 'sky', 'grape', 'school', 'park',
  'ocean', 'dice', 'carrot', 'bird', 'doll',
];

export const VocabularyArt = ({ word, className = '' }: { word: string; className?: string }) => {
  const normalized = word.toLowerCase();
  if (normalized === 'star') return <img src={starImage} alt="" aria-hidden="true" className={`object-contain ${className}`} />;
  if (normalized === 'snow') return <img src={snowImage} alt="" aria-hidden="true" className={`object-contain ${className}`} />;
  let index = spriteOrder.indexOf(normalized);
  let sheet = vocabularySheet;
  let rows = 4;
  if (index < 0) {
    index = spriteOrder2.indexOf(normalized);
    sheet = vocabularySheet2;
  }
  if (index < 0) {
    index = spriteOrder3.indexOf(normalized);
    sheet = vocabularySheet3;
    rows = 3;
  }
  if (index < 0) return null;
  const col = index % 5;
  const row = Math.floor(index / 5);
  return (
    <span
      aria-hidden="true"
      className={`vocabulary-art ${className}`}
      style={{ backgroundImage: `url(${sheet})`, backgroundSize: `500% ${rows * 100}%`, backgroundPosition: `${col * 25}% ${row * (100 / (rows - 1))}%` }}
    />
  );
};
