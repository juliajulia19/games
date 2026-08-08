export type AlphabetQuestion = {
  letter: string;
  word: string;
  options: string[];
  answer: string;
  image: string;
};

export const alphabetQuestions: AlphabetQuestion[] = [
  { letter: 'A', word: 'Apple', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Apple', image: 'A' },
  { letter: 'B', word: 'Ball', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Ball', image: 'B' },
  { letter: 'C', word: 'Cat', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Cat', image: 'C' },
  { letter: 'D', word: 'Dog', options: ['Apple', 'Ball', 'Cat', 'Dog'], answer: 'Dog', image: 'D' },
  { letter: 'E', word: 'Elephant', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Elephant', image: 'E' },
  { letter: 'F', word: 'Fish', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Fish', image: 'F' },
  { letter: 'G', word: 'Giraffe', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Giraffe', image: 'G' },
  { letter: 'H', word: 'Hat', options: ['Elephant', 'Fish', 'Giraffe', 'Hat'], answer: 'Hat', image: 'H' },
  { letter: 'I', word: 'Ice cream', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Ice cream', image: 'I' },
  { letter: 'J', word: 'Juice', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Juice', image: 'J' },
  { letter: 'K', word: 'Kite', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Kite', image: 'K' },
  { letter: 'L', word: 'Lion', options: ['Ice cream', 'Juice', 'Kite', 'Lion'], answer: 'Lion', image: 'L' },
  { letter: 'M', word: 'Moon', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Moon', image: 'M' },
  { letter: 'N', word: 'Nest', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Nest', image: 'N' },
  { letter: 'O', word: 'Orange', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Orange', image: 'O' },
  { letter: 'P', word: 'Pizza', options: ['Moon', 'Nest', 'Orange', 'Pizza'], answer: 'Pizza', image: 'P' },
  { letter: 'Q', word: 'Queen', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Queen', image: 'Q' },
  { letter: 'R', word: 'Rabbit', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Rabbit', image: 'R' },
  { letter: 'S', word: 'Sun', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Sun', image: 'S' },
  { letter: 'T', word: 'Tiger', options: ['Queen', 'Rabbit', 'Sun', 'Tiger'], answer: 'Tiger', image: 'T' },
];
