function containsAllKeywords(text: string, keywords: string[]) {
  return keywords.every((keyword) => text.includes(keyword));
}

export default async function admissionChecker(
  url: string,
  keywords: string[],
  encoding: string = "utf-8",
) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Content-Type": "text/html",
    },
  });

  const buffer = await response.arrayBuffer(); // 응답 데이터를 바이너리 형태로 가져오기

  // TextDecoder로 특정 인코딩 처리
  const decoder = new TextDecoder(encoding);
  const html = decoder.decode(buffer);

  let state = false;

  if (containsAllKeywords(html, keywords)) {
    state = true;
  }

  return state;
}
