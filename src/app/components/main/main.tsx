'use client';

import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import access from "../../assets/access.png";
import Image, { StaticImageData } from "next/image";
import questionData from "../../assets/question.json";
import { useEffect, useState } from "react";
import { Button } from "../_molecules";
import { CiCircleRemove } from "react-icons/ci";

interface Subject {
  label: string;
  image: StaticImageData;
}

interface Question {
  question: string;
  category: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: string;
}

const questions: Question[] = questionData as Question[];

export default function Main() {
  const [type, setType] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [kitxva, setKitxva] = useState<Question | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [checkButton, setCheckButton] = useState<boolean>(false);
  const [num, setNum] = useState(0);
  const [result, setResult] = useState<boolean>(false);
  const [ans, setAns] = useState<string>('');
  const [lock, setLock] = useState<boolean>(false);
  const [checkQuestion, setCheckQuestion] = useState<boolean>(false);

  const handleClick = (label: string) => {
    setType(label);
    setShow(true);
  };

  const subjects: Subject[] = [
    { label: 'HTML', image: html },
    { label: 'CSS', image: css },
    { label: 'Javascript', image: js },
    { label: 'Accessibility', image: access },
  ];

  const filterQuestion = () => {
    const filtered = questions.filter((item) => item.category === type);
    setFilteredQuestions(filtered);
    if (filtered.length > 0) {
      setKitxva(filtered[0]);
    }
  };

  useEffect(() => {
    filterQuestion();
  }, [type]);

  const nextQuestion = () => {
    if (index === filteredQuestions.length - 1) {
      if (checkQuestion) {
        setNum((prev) => prev + 1);
      }
      setResult(true);
      return;
    }
    if (index < filteredQuestions.length - 1) {
      setIndex(index + 1);
      setKitxva(filteredQuestions[index + 1]);
      setLock(false);
      setCheckButton(false);
      setAns('');
      if (checkQuestion) {
        setNum((prev) => prev + 1);
      }
    }
  };

  const handleAns = (type: string) => {
    setAns(type);
  };
   const [empty, setEmpty]= useState(true)
  const checkAns = () => {
    if (!ans) {
      setEmpty(false);
      return;
    }
    setEmpty(true);
    const correctAnswer = kitxva?.correct;
    if (!lock) {
      if (correctAnswer && ans !== correctAnswer) {
        setCheckQuestion(false);
        setLock(true);
        setCheckButton(true);
      } else {
        setLock(true);
        setCheckQuestion(true);
        setCheckButton(true);
      }
    }
  };

  const tryAgain = () => {
    setIndex(0);
    setKitxva(filteredQuestions[0]);
    setCheckButton(false);
    setLock(false);
    setAns('');
    setShow(false);
    setResult(false);
    setNum(0)
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[40px] pt-[32px]">
      {!show ? (
        <>
          <div>
            <p className="text-[40px] font-light text-[#313E51] dark:text-white w-[283px] leading-[44px]">
              Welcome to the <span className="text-[40px] font-bold text-[#313E51] dark:text-white w-[283px]">Frontend Quiz!</span>
            </p>
            <p className="pt-[16px] text-[#626C7F] dark:text-gray-300 text-[14px] font-[400] italic">
              Pick a subject to get started.
            </p>
          </div>
          <div className="flex flex-col gap-[12px]">
            {subjects.map((subject, index) => (
              <div
                key={index}
                onClick={() => handleClick(subject.label)}
                className="bg-white dark:bg-gray-800 dark:text-white w-[327px] h-[64px] flex items-center p-[12px] gap-[16px] rounded-[12px] shadow-md shadow-[rgba(143, 160, 193, 0.14)] cursor-pointer"
              >
                <Image src={subject.image} alt={subject.label} />
                <p className="text-[18px] text-black dark:text-white font-normal">{subject.label}</p>
              </div>
            ))}
          </div>
        </>
      ) : result ? (
        <div className="flex flex-col">
          <h3 className="text-[40px] font-normal text-[#313E51] dark:text-white w-[327px]">
            Quiz completed <span className="text-[40px] text-[#313E51] dark:text-white font-bold">You scored...</span>
          </h3>
          <div className="bg-white dark:bg-[#3B4D66] rounded-[12px] flex justify-center flex-col items-center p-[32px] gap-[32px]">
            <p className="text-[18px] text-[#313E51] dark:text-white">Your Score</p>
            <p className="text-[88px] text-[#313E51] dark:text-white">{num}</p>
            <p className="text-[#626C7F] dark:text-white">out of {filteredQuestions.length}</p>
          </div>
          <Button text="Try Again" onClick={tryAgain} />
        </div>
      ) : (
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[14px] italic text-[#626C7F] font-normal w-full text-start pb-[12px] dark:text-white">
              Question {index + 1} of {filteredQuestions.length}
            </p>
            <h3 className="w-[327px] text-[20px] font-medium text-[#313E51] dark:text-white">{kitxva?.question || 'Loading...'}</h3>
          </div>
          <div className="flex flex-col gap-[12px] items-center justify-center">
            {kitxva && kitxva.answers ? (
              <>
                {Object.entries(kitxva.answers).map(([key, value]) => (
                  <button
                    key={key}
                    className={`flex w-[327px] h-[64px] bg-white dark:bg-gray-800 dark:text-white p-[12px] gap-[16px] items-center rounded-[12px] group cursor-pointer focus:border-[#A729F5] focus:border-[2px] 
                    ${lock ? (ans === key && kitxva?.correct === key ? 'border-green-400 border-[2px]' : ans === key ? 'border-red-400 border-[2px]' : '') : ''}`}
                    onClick={() => handleAns(key)}
                    disabled={lock}
                  >
                    <div
                      className={`w-[40px] h-[40px] bg-[#F4F6FA] text-[18px] text-center text-[#626C7F] rounded-xl pt-[5px] group-hover:bg-[#F6E7FF] group-hover:text-[#A729F5] transition-colors group-focus:bg-[#A729F5] group-focus:text-white 
                      ${lock ? (ans === key && kitxva?.correct === key ? 'bg-green-400' : ans === key ? 'bg-red-400' : '') : ''}`}
                    >
                      {key}
                    </div>
                    {value}
                  </button>
                ))}
                {checkButton ? (
                  <Button text="Next Question" onClick={nextQuestion} />
                ) : (
                  <Button text="Submit Answer" onClick={checkAns} />
                )}
                {!empty &&
                <>
                
                <p className="text-red-500 dark:text-white flex items-center gap-[8px]"><span className="text-red-500 text-[24px]"><CiCircleRemove /></span>Please select an answer</p>
                </>
                }
                
              </>
            ) : (
              <p>Loading answers...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}







