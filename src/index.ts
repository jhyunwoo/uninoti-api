import { Hono } from "hono";
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

/**
 * 서울대 수시 최종 합격자 발표
 */
app.get("/snu-final", async (c) => {
  return c.json({
    state: true,
  });
});

/**
 * 연세대 수시 최종 합격자 발표
 */
app.get("/yonsei-final", async (c) => {
  // const url =
  //   "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/notice.asp";

  // return c.json({
  //   state: (await countInText(url, "합격자", "euc-kr")) > 16,
  // });
  return c.json({
    state: true,
  });
});

/**
 * 고려대 수시 최종 합격자 발표
 */
app.get("/korea-final", async (c) => {
  // const url = "https://oku.korea.ac.kr/oku/index.do";
  //
  // return c.json({
  //   state: (await countInText(url, "최종합격자")) > 17,
  // });
  return c.json({
    state: true,
  });
});

/**
 * 서강대 수시 최종 합격자 발표
 */
app.get("/sogang-final", async (c) => {
  return c.json({
    state: true,
  });
});

/**
 * 한양대 수시 최종 합격자 발표
 */
app.get("/hanyang-final", async (c) => {
  return c.json({
    state: true,
  });
});

app.get("/snu-jigyun-1st", async (c) => {
  // const url = "https://admission.snu.ac.kr/undergraduate/notice";
  //
  // const state = await admissionChecker(url, ["2025", "지역균형전형", "합격자"]);

  return c.json({
    state: true,
  });
});

app.get("/yonsei-international-1st", (c) => {
  return c.json({
    state: true,
  });
});

app.get("/yonsei-talent-international-final", async (c) => {
  // const url =
  //   "https://admission.yonsei.ac.kr/seoul/admission/html/rolling/notice.asp";
  //
  // const state = await admissionChecker(
  //   url,
  //   ["2025학년도", "수시모집", "특기자", "국제인재", "최종"],
  //   "euc-kr",
  // );

  return c.json({
    state: true,
  });
});

app.get("/korea-gaejuck-final", async (c) => {
  // const url = "https://oku.korea.ac.kr/oku/index.do";
  //
  // return c.json({
  //   state: (await countInText(url, "계열적합전형")) > 9,
  // });
  return c.json({
    state: true,
  });
});

app.get("/cau-tamgu-1st", async (c) => {
  // const url =
  //   "http://admission.cau.ac.kr/submenu.do?menuurl=n5%2fP1yX8Zyh%2fvtvla1KeyA%3d%3d&";
  // const state = await admissionChecker(url, ["25학년도", "탐구형", "합격자"]);
  // return c.json({
  //   state: state,
  // });
  return c.json({
    state: true,
  });
});

export default app;
