export type Riddle = {
  question: string;
  options: string[];
  answer: string;
};

export const riddles: Riddle[] = [
  { question: 'I am green. I can jump. Who am I?', options: ['Cat', 'Frog', 'Dog', 'Rabbit'], answer: 'Frog' },
  { question: 'I am yellow. I can fly. Who am I?', options: ['Bird', 'Sun', 'Apple', 'Carrot'], answer: 'Bird' },
  { question: 'I have four legs. I say meow. Who am I?', options: ['Cat', 'Dog', 'Lion', 'Rabbit'], answer: 'Cat' },
  { question: 'I am red. You can eat me. Who am I?', options: ['Apple', 'Carrot', 'Orange', 'Cake'], answer: 'Apple' },
  { question: 'I am big. I have a long trunk. Who am I?', options: ['Elephant', 'Lion', 'Tiger', 'Giraffe'], answer: 'Elephant' },
  { question: 'I shine in the sky during the day. Who am I?', options: ['Sun', 'Moon', 'Star', 'Cloud'], answer: 'Sun' },
  { question: 'I am orange and rabbits like me. Who am I?', options: ['Carrot', 'Orange', 'Cake', 'Pizza'], answer: 'Carrot' },
  { question: 'I am soft and you can sleep with me. Who am I?', options: ['Doll', 'Ball', 'Robot', 'Book'], answer: 'Doll' },
  { question: 'I am round and you can kick me. Who am I?', options: ['Ball', 'Dice', 'Apple', 'Car'], answer: 'Ball' },
  { question: 'I am a place where you read books. What am I?', options: ['School', 'Park', 'Ocean', 'Moon'], answer: 'School' },
  { question: 'I am used to write on paper. What am I?', options: ['Pen', 'Ruler', 'Bag', 'Chair'], answer: 'Pen' },
  { question: 'I am cold and white and fall from the sky. What am I?', options: ['Snow', 'Sun', 'Fire', 'Leaf'], answer: 'Snow' },
  { question: 'I am a tiny animal with a long tail. Who am I?', options: ['Mouse', 'Elephant', 'Lion', 'Tiger'], answer: 'Mouse' },
  { question: 'I am blue and you can float in me. What am I?', options: ['Water', 'Sand', 'Sky', 'Cloud'], answer: 'Water' },
  { question: 'I am a fruit that is yellow and you can peel me. Who am I?', options: ['Banana', 'Apple', 'Orange', 'Grape'], answer: 'Banana' },
];
