import { Hono } from "hono";
import admissionChecker from "./admission-checker";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import countInText from "./count-in-text";

const sites = ["https://uninoti.moveto.kr", "http://localhost:3000"];

const app = new Hono();

app.use(
  csrf({
    origin: sites,
  }),
);
app.use(
  cors({
    origin: sites,
  }),
);

app.get("/", (c) => {
  return c.json({ state: "Healthy" });
});

app.get("/snu-jigyun-1st", async (c) => {
  const url = "https://admission.snu.ac.kr/undergraduate/notice";

  const state = await admissionChecker(url, ["2025", "지역균형전형", "합격자"]);

  return c.json({
    state: state,
  });
});

app.get("/snu-final", async (c) => {
  const url = "https://admission.snu.ac.kr/undergraduate/notice";

  const state = await admissionChecker(url, [
    "2025학년도 대학 수시모집 합격자 발표",
  ]);

  return c.json({
    state: state,
  });
});

app.get("/yonsei-international-1st", (c) => {
  return c.json({
    state: true,
  });
});

app.get("/yonsei-talent-international-final", async (c) => {
  const url =
    "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/notice.asp";

  const state = await admissionChecker(
    url,
    ["2025학년도", "수시모집", "특기자", "국제인재", "최종"],
    "euc-kr",
  );

  return c.json({
    state: state,
  });
});

app.get("/yonsei-final", async (c) => {
  const url =
    "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/notice.asp";

  const state = await admissionChecker(
    url,
    ["2025학년도", "수시모집", "최종", "합격자"],
    "euc-kr",
  );

  return c.json({
    state: state,
  });
});

app.get("/korea-gaejuck-final", async (c) => {
  const url = "https://oku.korea.ac.kr/oku/index.do";
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Content-Type": "text/html",
    },
  });

  const buffer = await response.arrayBuffer(); // 응답 데이터를 바이너리 형태로 가져오기

  const decoder = new TextDecoder("utf-8");
  const html = decoder.decode(buffer);

  return c.json({
    state: countInText(html, "계열적합전형") > 9,
  });
});

app.get("/cau-tamgu-1st", async (c) => {
  const url =
    "http://admission.cau.ac.kr/submenu.do?menuurl=n5%2fP1yX8Zyh%2fvtvla1KeyA%3d%3d&";
  const state = await admissionChecker(url, ["25학년도", "탐구형", "합격자"]);
  return c.json({
    state: state,
  });
});

export default app;
