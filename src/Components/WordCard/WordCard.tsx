import { useCallback, useState } from "react";
import cn from "classnames";

import Modal from "../Modal";
import styles from "./WordCard.module.css";

import type { FC } from "react";
import type { WordData } from "../../api";

interface WordProps {
  className?: string;
  dictionary: WordData[];
}

const WordCard: FC<WordProps> = (props) => {
  const { className, dictionary, ...restProps } = props;
  const [translate, setTranslate] = useState(false);
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleNext = useCallback(() => {
    if (translate) setCounter((prev) => prev + 1);

    setTranslate((prev) => !prev);
  }, [translate]);

  const handleRestart = useCallback(() => {
    setCounter(0);
  }, []);

  const handleOpenModal = useCallback(() => {
    setModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      {dictionary[counter] ? (
        <>
          <div className={styles.word}>{dictionary[counter].word}</div>
          {translate && (
            <div className={styles.translation}>
              - {dictionary[counter].translation} -
            </div>
          )}
          <button
            className={cn(styles.button, styles.next)}
            onClick={handleNext}
          >
            ᐳ
          </button>
        </>
      ) : (
        <>
          <div className={styles.end}>Слова закончились</div>
          <button
            className={cn(styles.button, styles.restart)}
            onClick={handleRestart}
          >
            Начать заново
          </button>
        </>
      )}

      <button
        className={cn(styles.button, styles.plus)}
        onClick={handleOpenModal}
      >
        +
      </button>

      {modal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default WordCard;
