import { Hono } from "hono";
import admissionChecker from "./admission-checker";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";

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

  const state = await admissionChecker(url, ["2025", "일반전형", "합격자"]);

  return c.json({
    title: "서울대학교 학생부종합전형 지역균형전형 1단계 발표",
    state: state,
  });
});

app.get("/yonsei-international-1st", async (c) => {
  const url =
    "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/notice.asp";

  const state = await admissionChecker(
    url,
    ["2025학년도", "수시모집", "국제형"],
    "euc-kr",
  );

  return c.json({
    title: "연세대학교 학생부종합전형 국제형 1단계 발표",
    state: state,
  });
});

export default app;
