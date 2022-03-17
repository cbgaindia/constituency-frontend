import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from 'components/actions';

const questions = [
  {
    question: 'Do you know this question about Rajasthan?',
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
    image: '/assets/images/placeholder.jpg',
    kind: 'scheme',
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
    image: '/assets/images/placeholder.jpg',
    kind: 'state',
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
          .classList.add('wrong');
      }
      document
        .querySelector(`[data-id="${correct}"]`)
        .classList.add('correct');
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
      <Card>
        <div>
          <h3>{currentQuiz.question}</h3>
          <Options>
            {currentQuiz.options.map((item, index) => (
              <Item data-id={item.id} key={`${currentQuiz.name}-${index}`}>
                <input
                  type="radio"
                  id={item.id}
                  name={currentQuiz.name}
                  value={item.id}
                />
                <label htmlFor={item.id}>{item.text}</label>
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
            <Button size="sm" kind="secondary-outline" onClick={playAgain}>
              Play Again
            </Button>
            <Button href={currentQuiz.url} size="sm" kind="secondary">
              Go to Explorer
            </Button>
          </AnsweredButtons>
        </div>
        <Image
          src="/assets/images/placeholder.jpg"
          width={350}
          height={184}
          alt=""
          className="img-cover"
        />
      </Card>
    </section>
  );
};

export default HomeQuiz;

const Card = styled.div`
  display: flex;
  gap: 48px;
  justify-content: space-between;
  padding: 48px;
  border: 1px solid #c3cfd9;
  border-radius: 4px;
  margin-top: -86px;
  background-color: white;
  margin-bottom: 86px;

  button {
    margin-top: 16px;
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;

  > div {
    min-width: 50%;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 8px;

  &.wrong {
    color: red;
  }

  &.correct {
    color: green;

    label {
      font-weight: bold;
    }
  }
`;

const AnsweredButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: baseline;
`;
