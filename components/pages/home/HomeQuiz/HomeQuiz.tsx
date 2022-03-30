import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';

const questions = [
  {
    question:
      'Do you know this question about Rajasthan state which is like really weird?',
    options: [
      {
        id: 'huey',
        text: 'Huey',
      },
      {
        id: 'dewey',
        text: 'Dewey',
      },
      {
        id: 'louie',
        text: 'Louie',
      },
      {
        id: 'pixel',
        text: 'Pixel',
      },
    ],
    answer: 'pixel',
    url: '#',
    image: '/assets/images/ques1.png',
    kind: 'state',
    name: 'quiz1',
  },
  {
    question:
      'Do you know what was the Opening Balance of MGNREGA Scheme in Beejapur - Rajasthan?',
    options: [
      {
        id: 'huey',
        text: 'Huey',
      },
      {
        id: 'dewey',
        text: 'Dewey',
      },
      {
        id: 'louie',
        text: 'Louie',
      },
      {
        id: 'pixel',
        text: 'Pixel',
      },
    ],
    answer: 'pixel',
    url: '#',
    image: '/assets/images/ques2.png',
    kind: 'scheme',
    name: 'quiz2',
  },
];

const HomeQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(questions[0]);
  const submitRef = useRef(null);
  const answeredRef = useRef(null);

  function handleSubmitClick() {
    const selectedAns = document.querySelector(
      `input[name="${currentQuiz.name}"]:checked`
    ) as HTMLInputElement;
    if (selectedAns) {
      const correct = currentQuiz.answer;
      submitRef.current.setAttribute('hidden', 'true');
      answeredRef.current.removeAttribute('hidden');

      if (selectedAns.value != correct) {
        document
          .querySelector(`[data-id="${selectedAns.value}"]`)
          .classList.add('quiz-wrong');
      }
      document
        .querySelector(`[data-id="${correct}"]`)
        .classList.add('quiz-correct');
    } else {
      alert('select an option');
    }
  }

  function playAgain() {
    if (currentIndex == questions.length - 1) {
      setCurrentQuiz(questions[0]);
      setCurrentIndex(0);
    } else {
      setCurrentQuiz(questions[currentIndex + 1]);
      setCurrentIndex((prev) => prev + 1);
    }
    answeredRef.current.setAttribute('hidden', 'true');
    submitRef.current.removeAttribute('hidden');
  }

  return (
    <section className="container">
      <h2 className="sr-only">Quiz</h2>
      <Card img={currentQuiz.image}>
        <h3 className="gradient-amazon">{currentQuiz.question}</h3>
        <Options>
          {currentQuiz.options.map((item, index) => (
            <Item data-id={item.id} key={`${currentQuiz.name}-${index}`}>
              <input type="radio" name={currentQuiz.name} value={item.id} />
              {item.text}
            </Item>
          ))}
        </Options>
        <Button
          size="sm"
          kind="secondary"
          onClick={handleSubmitClick}
          passRef={submitRef}
        >
          Submit Answer
        </Button>
        <AnsweredButtons ref={answeredRef} hidden>
          <Button size="sm" kind="primary-outline" onClick={playAgain}>
            Play Again
          </Button>
          <Button href={currentQuiz.url} size="sm" kind="primary">
            {currentQuiz.kind == 'state' ? 'Explore State' : 'Go to Explorer'}
          </Button>
        </AnsweredButtons>
      </Card>
    </section>
  );
};

export default HomeQuiz;

interface StyledCardProps {
  img: string;
}

const Card = styled.div<StyledCardProps>`
  padding: 40px 40px 48px;
  margin-top: 56px;
  margin-bottom: -128px;
  isolation: isolate;

  border-radius: 4px;
  background-color: var(--color-background-lighter);
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: right;
  filter: drop-shadow(var(--box-shadow-1));

  h3 {
    font-weight: 900;
    font-size: 1.5rem;
  }

  button {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    padding: 24px;

    background-image: none;
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 16px;
  width: 50%;

  > label {
    min-width: 45%;
  }
`;

const Item = styled.label`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  color: var(--text-light-light);

  input {
    /* Remove native radio style */
    appearance: none;
    background-color: #fff;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(0.2em);

    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--color-grey-200);

      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus-visible {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }

  &.quiz-wrong {
    color: var(--color-error);

    input::before {
      box-shadow: inset 1em 1em var(--color-error);
      transform: scale(1);
    }
  }

  &.quiz-correct {
    color: var(--color-success);
    font-weight: bold;

    input::before {
      box-shadow: inset 1em 1em var(--color-success);
      transform: scale(1);
    }
  }
`;

const AnsweredButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: baseline;
`;
