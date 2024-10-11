"use client";

import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import access from "../../assets/access.png";
import Image, { StaticImageData } from "next/image";
import questionData from "../../assets/question.json";
import { useEffect, useState } from "react";
import { Button } from "../_molecules";
import { CiCircleRemove } from "react-icons/ci";
import { LuCheckCircle2 } from "react-icons/lu";

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
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [kitxva, setKitxva] = useState<Question | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [checkButton, setCheckButton] = useState<boolean>(false);
  const [num, setNum] = useState(0);
  const [result, setResult] = useState<boolean>(false);
  const [ans, setAns] = useState<string>("");
  const [lock, setLock] = useState<boolean>(false);
  const [checkQuestion, setCheckQuestion] = useState<boolean>(false);
  const [rect, setRect] = useState(20);
  const [checkButt, setCheckButt] = useState("");

  const handleClick = (label: string) => {
    setType(label);
    setShow(true);
    localStorage.setItem("selectedSubject", label);
  };

  const subjects: Subject[] = [
    { label: "HTML", image: html },
    { label: "CSS", image: css },
    { label: "Javascript", image: js },
    { label: "Accessibility", image: access },
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
      setRect((prev) => prev + 20);
      setResult(true);

      localStorage.setItem("score", num.toString());
      return;
    }
    setCheckButt("");

    if (index < filteredQuestions.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setKitxva(filteredQuestions[newIndex]);
      setLock(false);
      setCheckButton(false);
      setAns("");

      if (checkQuestion) {
        setNum((prev) => prev + 1);
      }

      setRect((prev) => {
        const newRect = prev + 20;
        localStorage.setItem("rect", newRect.toString());
        return newRect;
      });

      localStorage.setItem("currentQuestionIndex", newIndex.toString());
      localStorage.setItem("selectedAnswer", ""); // Clear saved answer when moving to the next question
    }
  };

  const handleAns = (type: string) => {
    setAns(type);
    localStorage.setItem("selectedAnswer", type);
  };
  const [empty, setEmpty] = useState(true);
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
    setAns("");
    setShow(false);
    setResult(false);
    setNum(0);
    setRect(20);
    setCheckButt("");
    localStorage.clear();
  };

  useEffect(() => {
    const savedSubject = localStorage.getItem("selectedSubject");
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    const savedScore = localStorage.getItem("score");
    const savedRect = localStorage.getItem("rect");
    const savedAnswer = localStorage.getItem("selectedAnswer");

    if (savedSubject) {
      setType(savedSubject);
      setShow(true);
    }

    if (savedIndex) {
      const parsedIndex = parseInt(savedIndex);
      setIndex(parsedIndex);
      setKitxva(filteredQuestions[parsedIndex]);
    }

    if (savedScore) {
      setNum(parseInt(savedScore));
    }

    if (savedRect) {
      setRect(parseInt(savedRect));
    }

    if (savedAnswer) {
      setAns(savedAnswer);
    }
  }, [filteredQuestions]);

  return (
    <div className="flex flex-col justify-center items-center gap-[40px] pt-[32px] md:px-[64px] md:py-[49px] lg:flex-row lg:items-baseline lg:px-[140px] lg:py-[40px]">
      {!show ? (
        <>
          <div className="flex flex-col md:w-full">
            <p className="text-[40px] font-light text-[#313E51] dark:text-white w-[283px]  md:text-[64px] md:w-[444px]">
              Welcome to the
            </p>
            <p className="text-[40px] mt-[-13px] font-semibold text-[#313E51] dark:text-white w-[283px] md:text-[64px] md:w-[444px] md:mt-[-20px]">
              Frontend Quiz!
            </p>
            <p className="pt-[16px] text-[#626C7F] dark:text-gray-300 text-[14px] font-[400] italic md:text-[20px]">
              Pick a subject to get started.
            </p>
          </div>
          <div className="flex flex-col gap-[12px] md:w-full lg:ml-[130px]">
            {subjects.map((subject, index) => (
              <div
                key={index}
                onClick={() => handleClick(subject.label)}
                className="bg-white dark:bg-gray-800 dark:text-white w-[327px] h-[64px] flex items-center p-[12px] gap-[16px] rounded-[12px] shadow-md shadow-[rgba(143, 160, 193, 0.14)] cursor-pointer md:w-[640px] lg:w-[524px] lg:h-[76px] lg:px-[20px] lg:py-[18px] lg:text-[28px] lg:rounded-[24px]"
              >
                <Image src={subject.image} alt={subject.label} />
                <p className="text-[18px] text-black dark:text-white font-normal lg:text-[28px]">
                  {subject.label}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : result ? (
        <div className="flex flex-col  gap-[12px] md:gap-[32px] lg:flex-row lg:items-baseline">
          <h3 className="text-[40px] font-normal text-[#313E51] dark:text-white w-[327px] md:text-[64px] md:w-[450px] md:pb-[16px] lg:mr-[200px]">
            Quiz completed{" "}
            <span className="text-[40px] text-[#313E51] dark:text-white font-bold md:text-[64px] md:w-[450px]">
              You scored...
            </span>
          </h3>
          <div className="flex flex-col gap-[12px] md:gap-[32px] lg:gap-[32px]">
            <div className="bg-white dark:bg-[#3B4D66] rounded-[12px] flex justify-center flex-col items-center p-[32px] gap-[32px]">
              <p className="text-[18px] text-[#313E51] dark:text-white">
                {type}
              </p>
              <p className="text-[88px] text-[#313E51] dark:text-white lg:text-[144px]">
                {num}
              </p>
              <p className="text-[#626C7F] dark:text-white">
                out of {filteredQuestions.length}
              </p>
            </div>
            <Button text="Try Again" onClick={tryAgain} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[40px] md:w-full lg:flex-row lg:items-baseline">
          <div className="flex flex-col items-center justify-center md:items-start lg:h-[522px] lg:justify-between lg:mr-[60px]">
            <div>
              <p className="text-[14px] italic text-[#626C7F] font-normal w-full text-start pb-[12px] dark:text-white md:text-[20px]">
                Question {index + 1} of {filteredQuestions.length}
              </p>
              <h3 className="w-[327px] text-[20px] font-medium text-[#313E51] dark:text-white md:text-[36px] md:w-[640px] md:text-left lg:w-[456px]">
                {kitxva?.question || "Loading..."}
              </h3>
            </div>
            <div className="border-[0px]  w-[327px] h-[16px] p-[4px] bg-white dark:bg-[#3B4D66] rounded-[999px] mt-[24px] md:w-[614px] lg:mb-[170px]">
              <div
                className=" bg-[#A729F5]  h-[8px] rounded-[99px] mt-[-1px]"
                style={{ width: `${rect}%` }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] items-center justify-center md:items-start lg:gap-[24px]">
            {kitxva && kitxva.answers ? (
              <>
                {Object.entries(kitxva.answers).map(([key, value]) => {
                  return (
                    <button
                      key={key}
                      className={`flex relative w-[327px] h-[64px] bg-white dark:bg-gray-800 dark:text-white p-[12px] gap-[16px] items-center rounded-[12px] group cursor-pointer
                        ${
                          checkButt === key
                            ? "border-[#A729F5] border-[2px]"
                            : ""
                        }  
                        md:w-[616px] md:h-[56px] md:p-[12px] lg:w-[524px] lg:h-[76px] lg:px-[20px] lg:py-[18px] lg:text-[28px] lg:rounded-[24px]
                        ${
                          lock
                            ? key === kitxva?.correct
                              ? "border-green-400 border-[2px]"
                              : ans === key
                              ? "border-red-400 border-[2px]"
                              : ""
                            : ""
                        }`}
                      onClick={() => {
                        handleAns(key);
                        setCheckButt(key);
                      }}
                      disabled={lock}
                    >
                    <div
                    className={`w-[40px] h-[40px] text-[18px] text-center text-[#626C7F] rounded-xl pt-[5px] 
                       ${checkButt === key ? "pointer-events-none" : "group-hover:bg-[#F6E7FF] group-hover:text-[#A729F5]"} 
                       transition-colors
                      ${
                        lock
                        ? key === kitxva?.correct
                        ? "bg-green-400 text-white" 
                        : ans === key
                        ? "bg-red-400 text-white"   
                        : "bg-[#F4F6FA]"            
                        : checkButt === key
                        ? "bg-[#A729F5] text-white"   
                        : "bg-[#F4F6FA]"               
                      }`}
                    >
                       {key}
                    </div>
                      {value}
                      {lock && ans === key && kitxva?.correct === key && (
                        <LuCheckCircle2 className="text-green-400 absolute right-4 text-[22px]" />
                      )}
                      {lock && ans === key && kitxva?.correct !== key && (
                        <CiCircleRemove className="text-red-500 absolute right-4 text-[22px]" />
                      )}
                    </button>
                  );
                })}
                {checkButton ? (
                  <Button text="Next Question" onClick={nextQuestion} />
                ) : (
                  <Button text="Submit Answer" onClick={checkAns} />
                )}
                {!empty && (
                  <>
                    <p className="text-red-500 dark:text-white flex items-center justify-center gap-[8px] md:w-full">
                      <span className="text-red-500 text-[24px]">
                        <CiCircleRemove />
                      </span>
                      Please select an answer
                    </p>
                  </>
                )}
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
