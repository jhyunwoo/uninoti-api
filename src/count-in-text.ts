export default function countInText(text: string, word: string) {
  let count = 0;
  let index = 0;

  // indexOf로 단어를 찾고, 반복문을 통해 찾은 위치부터 다시 검색
  while ((index = text.indexOf(word, index)) !== -1) {
    count++;
    index += word.length; // 찾은 위치 이후부터 다시 검색
  }

  return count;
}
