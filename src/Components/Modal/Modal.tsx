import { useCallback, useRef } from "react";
import cn from "classnames";

import api from "../../api";
import styles from "./Modal.module.css";

import type { FC, FormEvent } from "react";

interface ModalProps {
  className?: string;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { className, onClose, ...restProps } = props;
  const wordRef = useRef<HTMLInputElement>(null);
  const translationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = new FormData(event.currentTarget);
      const word = form.get("word")?.toString();
      const translation = form.get("translation")?.toString();

      if (!word || !translation) {
        alert("Введите все данные");

        return;
      }

      try {
        await api.addWord({
          word: word,
          translation: translation,
        });
        if (!wordRef.current || !translationRef.current) return;

        wordRef.current.value = "";
        translationRef.current.value = "";
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <div className={styles.title}>Добавить новое слово</div>
            <button
              className={cn(styles.button, styles.close)}
              onClick={handleClose}
            >
              ×
            </button>
          </div>
          <label className={styles.label} htmlFor="word">
            Слово
          </label>
          <input
            className={styles.input}
            ref={wordRef}
            type="text"
            id="word"
            name="word"
            autoComplete="off"
          />

          <label className={styles.label} htmlFor="translation">
            Перевод
          </label>
          <input
            className={styles.input}
            ref={translationRef}
            type="text"
            name="translation"
            autoComplete="off"
          />

          <input
            className={cn(styles.button, styles.save)}
            type="submit"
            value="Сохранить"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
