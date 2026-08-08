export type AlphabetQuestion = {
  letter: string;
  word: string;
  options: string[];
  answer: string;
  image: string;
};

export const alphabetQuestions: AlphabetQuestion[] = [
  { letter: 'A', word: 'Apple', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Apple', image: '🍎' },
  { letter: 'B', word: 'Ball', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Ball', image: '⚽' },
  { letter: 'C', word: 'Cat', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Cat', image: '🐱' },
  { letter: 'D', word: 'Dog', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Dog', image: '🐶' },
  { letter: 'E', word: 'Elephant', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Elephant', image: '🐘' },
  { letter: 'F', word: 'Fish', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Fish', image: '🐠' },
  { letter: 'G', word: 'Giraffe', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Giraffe', image: '🦒' },
  { letter: 'H', word: 'Hat', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Hat', image: '🎩' },
  { letter: 'I', word: 'Ice cream', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Ice cream', image: '🍦' },
  { letter: 'J', word: 'Juice', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Juice', image: '🧃' },
  { letter: 'K', word: 'Kite', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Kite', image: '🪁' },
  { letter: 'L', word: 'Lion', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Lion', image: '🦁' },
  { letter: 'M', word: 'Moon', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Moon', image: '🌙' },
  { letter: 'N', word: 'Nest', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Nest', image: '🪺' },
  { letter: 'O', word: 'Orange', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Orange', image: '🍊' },
  { letter: 'P', word: 'Pizza', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Pizza', image: '🍕' },
  { letter: 'Q', word: 'Queen', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Queen', image: '👑' },
  { letter: 'R', word: 'Rabbit', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Rabbit', image: '🐰' },
  { letter: 'S', word: 'Sun', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Sun', image: '☀️' },
  { letter: 'T', word: 'Tiger', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Tiger', image: '🐅' },
];
