export default async function countInText(
  url: string,
  word: string,
  encoding = "utf-8",
) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Content-Type": "text/html",
    },
  });

  const buffer = await response.arrayBuffer(); // 응답 데이터를 바이너리 형태로 가져오기

  const decoder = new TextDecoder(encoding);
  const html = decoder.decode(buffer);
  let count = 0;
  let index = 0;

  // indexOf로 단어를 찾고, 반복문을 통해 찾은 위치부터 다시 검색
  while ((index = html.indexOf(word, index)) !== -1) {
    count++;
    index += word.length; // 찾은 위치 이후부터 다시 검색
  }

  return count;
}
