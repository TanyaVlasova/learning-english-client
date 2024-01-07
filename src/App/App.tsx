import { useCallback, useEffect, useState } from "react";
import cn from "classnames";

import WordCard from "../Components/WordCard";
import api from "../api";
import styles from "./App.module.css";

import type { FC } from "react";
import type { WordData } from "../api";

interface AppProps {
  className?: string;
}

const App: FC<AppProps> = (props) => {
  const { className, ...restProps } = props;
  const [dictionary, setDictionary] = useState<WordData[]>([]);

  const loadDictionary = useCallback(async () => {
    try {
      const result = await api.getDictionary();
      setDictionary(result);
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    loadDictionary();
  }, [loadDictionary]);

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      <WordCard dictionary={dictionary} />
    </div>
  );
};

export default App;
