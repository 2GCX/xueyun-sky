"use strict";

/* ============================================
   同学录内容：这些都是写信人自己的资料，不是酉雪云的资料。
   已按你提供的内容填写；如需修改，直接编辑下方字符串。
   生日可只写月日，星座可不填；留言可使用 \n 换行。
   不要填写 HTML 标签，内容会作为普通文字安全显示。
   ============================================ */
const CLASSMATE_RECORD = {
  name: "朱嘉润",
  nickname: "猪头，狗不理",
  birthday: "7.26",
  zodiac: "狮子座",
  hobbies: "吃，听歌，看小说",
  color: "没有特别喜欢的，可能会偏爱一点紫色",
  food: "想吃尽天底所有豆腐",
  animal: "cat",
  sport: "排球",
  song: "天龙八部之宿敌",
  message: "hallow，酉雪云，很高兴给你写同学录，我们初中交流不多，但遇见即是缘分，所以很高兴我们能成为同学啦！\n\n其实在我心里，我一直觉得你很好看，笑起来尤其好看（说谎的人出门被狗咬哦），印象中你很爱笑，跟谁说话都是笑着的，但我不知道你是不是真的开心，偶尔不开心也没关系，不用每天都要求自己笑着，但我希望你每天都开心一点 😊。\n\n还有当时运动会，那一刻在我心里你是我们班最棒哒，我没记错的话好像是第四名来着（如果记错了求原谅并指正一下），我可是一直在为你加油的，所以你自己也真的很了不起呀！！\n\n告诉你个秘密，我会穿越，5年后你就是个贪吃鬼，胃口比我还大，哈哈哈，不过吃货的世界我不懂呢，或许是缘分使然，2025年12月29号我QQ号被盗了，但我们也因此无话不谈，所以或许有失真的也有得，我很珍惜这份友谊，你也一定是的吧",
  blessing: "祝你越来越好看，能吃会道，愿我们都能成为生活的高手吧",
  signature: "朱嘉润",
  date: "2026年10月18日"
};

(() => {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const byId = (id) => document.getElementById(id);

  // 静态展示卡片，不收集访客输入，也不把填写的内容当作 HTML 运行。
  const recordFields = [...document.querySelectorAll("[data-record-field]")];
  for (const field of recordFields) {
    const value = CLASSMATE_RECORD[field.dataset.recordField];
    const hasContent = typeof value === "string" && value.trim().length > 0;
    if (hasContent) field.textContent = value.trim();
    field.classList.toggle("is-empty", !hasContent);
  }
  // 一旦填入真实内容，预览标记自动收起；可选项目可以继续留空。
  byId("recordDraft").hidden = Object.values(CLASSMATE_RECORD).some(
    (value) => typeof value === "string" && value.trim().length > 0
  );

  // 固定导航：按实际滚动位置标记栏目，深链接也能使用。
  const header = byId("siteHeader");
  const sections = [...document.querySelectorAll("main > .section")];
  const navigationLinks = [...document.querySelectorAll(".main-nav a")];
  let navigationFrame = 0;
  function updateNavigation() {
    navigationFrame = 0;
    header.classList.toggle("is-scrolled", window.scrollY > 28);
    const readingLine = header.offsetHeight + Math.min(180, window.innerHeight * 0.2);
    let active = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) active = section.id;
    }
    for (const link of navigationLinks) {
      if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
  function requestNavigationUpdate() {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  }
  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  window.addEventListener("resize", requestNavigationUpdate, { passive: true });
  window.addEventListener("hashchange", requestNavigationUpdate);
  updateNavigation();

  // 只有 JS 和观察器可用时才开启入场效果，避免无脚本时隐藏正文。
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -22px 0px" });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    document.documentElement.classList.add("js");
  }

  // 首页蝴蝶：独立彩蛋，不要求收集或解锁。
  byId("heroButterfly").addEventListener("click", () => {
    byId("heroButterfly").classList.add("is-discovered");
    byId("butterflySecret").textContent = "被你发现了。";
  });

  // 三个字：正文始终可读，点击只是添一点风景。
  const seenCharacters = new Set();
  for (const button of document.querySelectorAll(".name-piece")) {
    button.addEventListener("click", () => {
      const wasPressed = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", String(!wasPressed));
      seenCharacters.add(button.dataset.character);
      if (seenCharacters.size === 3) {
        byId("nameAfterword").textContent = "原来，一个名字也能装下一小片风景。";
        byId("nameButterfly").hidden = false;
      }
    });
  }

  // 光点只代表一段旅程，不对应她当年的用时或比赛过程。
  let runningFrame = 0;
  let runStarted = false;
  function setTrackProgress(progress) {
    byId("trackFill").style.width = `${progress * 100}%`;
    byId("trackRunner").style.left = `${progress * 100}%`;
  }
  function runLight() {
    cancelAnimationFrame(runningFrame);
    runStarted = true;
    setTrackProgress(0);
    byId("trackNote").textContent = "这一程，找到自己的节奏。";
    if (motionPreference.matches) {
      setTrackProgress(1);
      byId("trackNote").textContent = "这一页，留给那个跑过终点的你。";
      return;
    }
    const start = performance.now();
    const duration = 3400;
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      setTrackProgress(progress);
      if (progress < 1) runningFrame = requestAnimationFrame(frame);
      else {
        runningFrame = 0;
        byId("trackNote").textContent = "这一页，留给那个跑过终点的你。";
      }
    }
    runningFrame = requestAnimationFrame(frame);
  }
  byId("replayRun").addEventListener("click", runLight);
  if ("IntersectionObserver" in window) {
    const runObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !runStarted) {
        runLight();
        runObserver.disconnect();
      }
    }, { threshold: 0.65 });
    runObserver.observe(byId("miniTrack"));
  } else {
    setTrackProgress(1);
  }

  // 今日心情：所有状态仅保存在本次页面内，不记录、不上传。
  const field = byId("moodField");
  const happyButton = byId("happyButton");
  const unhappyButton = byId("unhappyButton");
  const cluster = byId("unhappyCluster");
  const unhappyFace = byId("unhappyFace");
  const success = byId("moodSuccess");
  const expressions = ["🙁", "😞", "😣"];
  const messages = [
    "怎么啦，今天不太顺利吗？",
    "把烦恼先放在这里。",
    "烦恼丢掉一点点。",
    "不开心正在缩小……",
    "要不要收下一点好心情？"
  ];
  let unhappyCount = 0;
  let moodFinished = false;
  let resizeTimer = 0;
  let lastMessage = -1;

  function fitHappyFace() {
    const smallScreen = window.matchMedia("(max-width: 700px)").matches;
    const base = smallScreen ? 70 : 88;
    const cap = Math.min(smallScreen ? 124 : 174, happyButton.clientWidth - 22);
    const size = Math.min(cap, base + unhappyCount * (smallScreen ? 12 : 19));
    field.style.setProperty("--happy-size", `${size}px`);
  }

  function rectanglesOverlap(a, b, padding = 12) {
    return a.left < b.right + padding && a.right > b.left - padding &&
      a.top < b.bottom + padding && a.bottom > b.top - padding;
  }

  function placeUnhappy(randomize = true) {
    if (moodFinished) return;
    const fieldRect = field.getBoundingClientRect();
    if (!fieldRect.width) return;
    const width = cluster.offsetWidth;
    const height = cluster.offsetHeight;
    const inset = 12;
    const maxX = Math.max(inset, field.clientWidth - width - inset);
    const maxY = Math.max(inset, field.clientHeight - height - inset);
    const happyRect = happyButton.getBoundingClientRect();
    const obstacle = {
      left: happyRect.left - fieldRect.left,
      top: happyRect.top - fieldRect.top,
      right: happyRect.right - fieldRect.left,
      bottom: happyRect.bottom - fieldRect.top
    };
    const oldX = parseFloat(cluster.style.left) || 0;
    const oldY = parseFloat(cluster.style.top) || 0;
    let position;
    if (!randomize) {
      position = {
        x: Math.max(inset, Math.min(maxX, field.clientWidth * 0.73 - width / 2)),
        y: Math.min(maxY, field.clientHeight * 0.37 - height / 2)
      };
    }
    for (let attempt = 0; randomize && attempt < 70; attempt++) {
      const x = inset + Math.random() * (maxX - inset);
      const y = inset + Math.random() * (maxY - inset);
      const candidate = { left: x, top: y, right: x + width, bottom: y + height };
      if (!rectanglesOverlap(candidate, obstacle, 9) && Math.hypot(x - oldX, y - oldY) > 45) {
        position = { x, y };
        break;
      }
    }
    // 小屏空间不足时用安全候选区，不让表情盖住开心按钮或跑出卡片。
    if (!position || rectanglesOverlap({ left: position.x, top: position.y, right: position.x + width, bottom: position.y + height }, obstacle, 6)) {
      const candidates = [
        { x: maxX, y: inset + Math.random() * (maxY - inset) },
        { x: inset + Math.random() * (maxX - inset), y: maxY },
        { x: maxX, y: maxY }, { x: maxX, y: inset },
        { x: inset, y: maxY }, { x: inset, y: inset }
      ];
      const safe = candidates.filter(({ x, y }) => !rectanglesOverlap({ left: x, top: y, right: x + width, bottom: y + height }, obstacle, 6));
      position = safe.length ? safe.reduce((best, item) => Math.hypot(item.x - oldX, item.y - oldY) > Math.hypot(best.x - oldX, best.y - oldY) ? item : best) : candidates[0];
    }
    cluster.style.left = `${Math.round(position.x)}px`;
    cluster.style.top = `${Math.round(position.y)}px`;
  }

  unhappyButton.addEventListener("click", () => {
    if (moodFinished) return;
    unhappyCount += 1;
    unhappyFace.textContent = expressions[Math.min(unhappyCount, 2)];
    unhappyFace.style.setProperty("--unhappy-scale", Math.max(0.22, Math.pow(0.81, unhappyCount)).toFixed(3));
    fitHappyFace();
    let messageIndex = unhappyCount <= 2 ? unhappyCount - 1 : Math.floor(Math.random() * messages.length);
    if (messageIndex === lastMessage) messageIndex = (messageIndex + 1) % messages.length;
    lastMessage = messageIndex;
    byId("moodMessage").textContent = messages[messageIndex];
    byId("moodAnnouncement").textContent = `${messages[messageIndex]} 不开心缩小了一点，开心变大了一点。`;
    placeUnhappy(true);
  });

  happyButton.addEventListener("click", () => {
    if (moodFinished) return;
    moodFinished = true;
    happyButton.hidden = true;
    cluster.hidden = true;
    success.hidden = false;
    byId("moodAnnouncement").textContent = "好心情已送达。记得每天都要开心哦。不过，偶尔不开心也没关系。";
    // 键盘用户也能接着操作；不改变页面滚动位置。
    byId("resetMood").focus({ preventScroll: true });
  });

  byId("resetMood").addEventListener("click", () => {
    moodFinished = false;
    unhappyCount = 0;
    lastMessage = -1;
    success.hidden = true;
    happyButton.hidden = false;
    cluster.hidden = false;
    unhappyFace.textContent = expressions[0];
    unhappyFace.style.setProperty("--unhappy-scale", "1");
    byId("moodMessage").textContent = "点一下，把烦恼放小一点。";
    byId("moodAnnouncement").textContent = "重新开始。给今天选一个表情吧。";
    fitHappyFace();
    placeUnhappy(false);
    happyButton.focus({ preventScroll: true });
  });

  fitHappyFace();
  placeUnhappy(false);
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!moodFinished) {
        fitHappyFace();
        placeUnhappy(false);
      }
    }, 120);
  }, { passive: true });
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches && runningFrame) {
      cancelAnimationFrame(runningFrame);
      runningFrame = 0;
      setTrackProgress(1);
      byId("trackNote").textContent = "这一页，留给那个跑过终点的你。";
    }
  });
})();

