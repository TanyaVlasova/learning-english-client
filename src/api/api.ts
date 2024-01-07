import type { WordData } from "./typings";

class Dictionary {
  async getDictionary() {
    const response = await fetch("/api/dictionary");
    const result: WordData[] = await response.json();

    return result;
  }

  async addWord(word: WordData) {
    const response = await fetch("/api/dictionary", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(word),
    });
    const result = await response.json();

    return result;
  }
}

const dictionary = new Dictionary();

export default dictionary;
