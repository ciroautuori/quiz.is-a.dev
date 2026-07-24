'use client';

import { useState } from 'react';
import { Sfida, getChallengeCorrectIndex } from '../lib/types';
import { attemptLeagueJumpOut } from '../lib/gamification';
import { soundEngine } from '../lib/soundEngine';

export function useJumpOutQuiz(allQuestions: Sfida[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [trackId, setTrackId] = useState<string>('python');
  const [questions, setQuestions] = useState<Sfida[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [promotedLeague, setPromotedLeague] = useState<string | null>(null);

  const startJumpOut = (selectedTrackId: string) => {
    setTrackId(selectedTrackId);
    
    // Select up to 5 advanced or medium difficulty questions
    const trackQs = allQuestions.filter(q => q.trackId === selectedTrackId);
    const hardQs = trackQs.filter(q => q.difficolta === 'difficile' || q.difficolta === 'media');
    const pool = hardQs.length >= 5 ? hardQs : trackQs;

    // Shuffle and pick 5
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIsFinished(false);
    setResultSuccess(false);
    setPromotedLeague(null);
    setIsOpen(true);
  };

  const handleAnswerOption = (optionIndex: number) => {
    const currentQ = questions[currentIndex];
    const correctIdx = getChallengeCorrectIndex(currentQ);
    const isCorrect = optionIndex === correctIdx;

    if (isCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playWrong();
    }

    const nextCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
    setCorrectAnswers(nextCorrect);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all 5
      setIsFinished(true);
      const passed = nextCorrect === questions.length; // Must get 5/5
      setResultSuccess(passed);

      if (passed) {
        soundEngine.playLevelUp();
        const outcome = attemptLeagueJumpOut('core_dev', nextCorrect, questions.length);
        if (outcome.success) {
          setPromotedLeague('Core Dev');
        }
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    trackId,
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex],
    correctAnswers,
    isFinished,
    resultSuccess,
    promotedLeague,
    startJumpOut,
    handleAnswerOption,
    closeModal
  };
}
