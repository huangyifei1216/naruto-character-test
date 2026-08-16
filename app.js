(() => {
  "use strict";

  const { questions, dimensions, characters } = window.TEST_DATA;
  const dimensionKeys = Object.keys(dimensions);
  const app = document.querySelector("#app");
  const toast = document.querySelector("#toast");
  const canvas = document.querySelector("#shareCanvas");
  const xiaohongshuShareUrl = "https://www.xiaohongshu.com/";
  const storeQrImageUrl = "assets/brand/store-qr.png";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const state = {
    screen: "intro",
    questionIndex: 0,
    answers: Array(questions.length).fill(null),
    result: null,
    advancing: false
  };

  const scoreCalibration = dimensionKeys.reduce((calibration, key) => {
    const aggregate = questions.reduce((acc, question) => {
      const values = question.options.map((option) => option.weights[key] || 0);
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const variance = values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length;
      acc.mean += mean;
      acc.variance += variance;
      return acc;
    }, { mean: 0, variance: 0 });
    calibration[key] = { mean: aggregate.mean, std: Math.sqrt(aggregate.variance) || 1 };
    return calibration;
  }, {});

  function scoreAnswers(answers) {
    const raw = Object.fromEntries(dimensionKeys.map((key) => [key, 0]));
    answers.forEach((optionIndex, questionIndex) => {
      const option = questions[questionIndex].options[optionIndex];
      dimensionKeys.forEach((key) => { raw[key] += option.weights[key] || 0; });
    });
    return Object.fromEntries(dimensionKeys.map((key) => {
      const { mean, std } = scoreCalibration[key];
      const score = 50 + ((raw[key] - mean) / std) * 15;
      return [key, Math.round(Math.max(5, Math.min(95, score)))];
    }));
  }

  const affinityModels = Object.fromEntries(Object.entries(characters).map(([id, character]) => {
    const values = dimensionKeys.map((key) => character.profile[key]);
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const std = Math.sqrt(values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length) || 1;
    const vector = Object.fromEntries(dimensionKeys.map((key) => [key, (character.profile[key] - mean) / std]));
    const optionScores = questions.map((question) => question.options.map((option) => {
      return dimensionKeys.reduce((sum, key) => sum + (option.weights[key] || 0) * vector[key], 0);
    }));
    const stats = optionScores.reduce((acc, choices) => {
      const choiceMean = choices.reduce((sum, value) => sum + value, 0) / choices.length;
      acc.mean += choiceMean;
      acc.variance += choices.reduce((sum, value) => sum + ((value - choiceMean) ** 2), 0) / choices.length;
      return acc;
    }, { mean: 0, variance: 0 });
    return [id, { optionScores, mean: stats.mean, std: Math.sqrt(stats.variance) || 1 }];
  }));

  function render() {
    if (state.screen === "intro") renderIntro();
    if (state.screen === "quiz") renderQuiz();
    if (state.screen === "reveal") renderReveal();
    if (state.screen === "result") renderResult();
    window.scrollTo(0, 0);
  }

  function renderIntro() {
    app.innerHTML = `
      <section class="screen intro-screen">
        <div class="intro-top">
          <span class="brand">SHINOBI ARCHETYPE</span>
          <span class="eyebrow">真实情境测评</span>
        </div>
        <div class="intro-visual" aria-hidden="true">
          <img src="assets/characters/naruto-anime.png" alt="">
          <span class="floating-rune one">✦</span>
          <span class="floating-rune two">⌁</span>
        </div>
        <div class="intro-copy">
          <span class="eyebrow">不是选学院，是测人格</span>
          <h1>你是火影忍者里的<em>哪个角色？</em></h1>
          <p class="lead">24 道没有标准答案的现代生活情境题，从勇气、羁绊、洞察、野心等 8 个维度，匹配你最接近的忍者角色原型，并生成一份包含优势、盲点、关系模式与行动建议的完整报告。</p>
          <div class="intro-meta" aria-label="测试信息">
          <span class="meta-chip">24 题</span>
          <span class="meta-chip">约 3 分钟</span>
          <span class="meta-chip">12 种结果</span>
          </div>
          <button class="primary-btn" id="startBtn">开始忍者人格测试 <span class="arrow">→</span></button>
          <p class="privacy-note">无需登录 · 答案仅在当前浏览器中计算</p>
        </div>
      </section>`;

    document.querySelector("#startBtn").addEventListener("click", startQuiz);
  }

  function startQuiz() {
    state.screen = "quiz";
    state.questionIndex = 0;
    state.answers = Array(questions.length).fill(null);
    state.result = null;
    render();
  }

  function renderQuiz() {
    const index = state.questionIndex;
    const question = questions[index];
    const selected = state.answers[index];
    const percent = ((index + 1) / questions.length) * 100;

    app.innerHTML = `
      <section class="screen quiz-screen">
        <header class="quiz-header">
          <button class="icon-btn" id="exitBtn" aria-label="退出测试">×</button>
          <div class="step-count"><strong>${String(index + 1).padStart(2, "0")}</strong> / ${questions.length}</div>
          <span aria-hidden="true"></span>
        </header>
        <div class="progress-track" role="progressbar" aria-label="答题进度" aria-valuemin="1" aria-valuemax="${questions.length}" aria-valuenow="${index + 1}">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
        <div class="question-wrap">
          <p class="question-kicker">${question.scene}</p>
          <h2 class="question-title">${question.title}</h2>
          <p class="question-hint">别选“应该怎样”，选你真的会怎样；选择后会自动进入下一题。</p>
          <div class="options">
            ${question.options.map((option, optionIndex) => `
              <button class="option-btn ${selected === optionIndex ? "selected" : ""}" data-option="${optionIndex}" aria-pressed="${selected === optionIndex}">
                ${option.text}
              </button>`).join("")}
          </div>
          <p class="quiz-footnote">没有好坏答案，直觉越诚实，结果越像你。</p>
          <nav class="quiz-nav" aria-label="题目导航">
            <button class="quiz-nav-btn prev-btn" id="prevBtn" ${index === 0 ? "disabled" : ""}>← 上一题</button>
            <button class="quiz-nav-btn next-btn" id="nextBtn" ${selected === null ? "disabled" : ""}>${index === questions.length - 1 ? "查看结果 →" : "下一题 →"}</button>
          </nav>
        </div>
      </section>`;

    document.querySelector("#exitBtn").addEventListener("click", exitQuiz);
    document.querySelector("#prevBtn").addEventListener("click", goPrevious);
    document.querySelector("#nextBtn").addEventListener("click", goNext);
    document.querySelectorAll("[data-option]").forEach((button) => {
      button.addEventListener("click", () => chooseOption(Number(button.dataset.option), button));
    });
  }

  function exitQuiz() {
    if (state.advancing) return;
    state.screen = "intro";
    render();
  }

  function goPrevious() {
    if (state.advancing) return;
    if (state.questionIndex === 0) return;
    state.questionIndex -= 1;
    render();
  }

  function chooseOption(optionIndex, button) {
    if (state.advancing) return;
    state.answers[state.questionIndex] = optionIndex;
    document.querySelectorAll("[data-option]").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    const nextButton = document.querySelector("#nextBtn");
    nextButton.disabled = false;

    state.advancing = true;
    window.setTimeout(() => {
      state.advancing = false;
      goNext();
    }, 260);
  }

  function goNext() {
    if (state.advancing) return;
    if (state.answers[state.questionIndex] === null) {
      showToast("请先选择一个最符合你的答案");
      return;
    }
    state.advancing = true;

    if (state.questionIndex < questions.length - 1) {
      state.questionIndex += 1;
      state.advancing = false;
      renderQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    state.result = calculateResult();
    state.screen = "reveal";
    state.advancing = false;
    render();
    window.setTimeout(() => {
      state.screen = "result";
      render();
    }, 1700);
  }

  function calculateResult() {
    const scores = scoreAnswers(state.answers);

    const ranking = Object.entries(characters).map(([id, character]) => {
      const model = affinityModels[id];
      const rawAffinity = state.answers.reduce((sum, answer, index) => sum + model.optionScores[index][answer], 0);
      return { id, character, affinity: (rawAffinity - model.mean) / model.std };
    }).sort((a, b) => b.affinity - a.affinity);

    const lead = ranking[0].affinity - ranking[1].affinity;
    ranking[0].similarity = Math.max(72, Math.min(96, Math.round(82 + ranking[0].affinity * 5 + lead * 4)));
    ranking[1].similarity = Math.max(65, Math.min(ranking[0].similarity - 2, Math.round(79 + ranking[1].affinity * 5)));

    return { scores, primary: ranking[0], runner: ranking[1], ranking };
  }

  function renderReveal() {
    app.innerHTML = `
      <section class="screen reveal-screen">
        <div class="reveal-inner">
          <div class="orb" aria-hidden="true"></div>
          <h2>正在读取你的人格轨迹</h2>
          <p>比对 8 个维度与 12 种角色原型…</p>
        </div>
      </section>`;
  }

  function renderResult() {
    const { scores, primary, runner, ranking } = state.result;
    const role = primary.character;
    const runnerRole = runner.character;
    const report = role.report || { core: role.summary, strengths: [], blindspot: "", companion: "", practice: "" };
    const runnerReport = runnerRole.report || report;
    const spectrumMin = ranking[ranking.length - 1].affinity;
    const spectrumRange = (ranking[0].affinity - spectrumMin) || 1;
    const spectrumRows = ranking.slice(0, 5).map((item, index) => {
      const level = Math.max(8, Math.round(((item.affinity - spectrumMin) / spectrumRange) * 100));
      const label = index === 0 ? "主结果" : index === 1 ? "第二人格" : `第 ${index + 1} 接近`;
      return `<div class="spectrum-row">
        <span class="spectrum-rank">0${index + 1}</span>
        <div class="spectrum-role"><strong>${item.character.name}</strong><small>${item.character.title} · ${label}</small></div>
        <div class="spectrum-bar"><i style="width:${level}%;--spectrum-color:${item.character.color}"></i></div>
        <output>${level}</output>
      </div>`;
    }).join("");
    const sectionDefs = [
      ["别人眼中的你", "你的外在人设", "public"],
      ["隐藏驱动力", "真正推动你的东西", "motive"],
      ["压力与阴影", "失控时会发生什么", "shadow"],
      ["亲密关系", "你如何建立羁绊", "relationship"],
      ["任务与野心", "你适合怎样的战场", "work"],
      ["成长路线", "下一阶段的忍道", "growth"]
    ];

    app.innerHTML = `
      <section class="result-screen" style="--role-color:${role.color}">
        <div class="result-hero">
          <img class="result-hero-image" src="${role.image}" alt="${role.name}的Q版人物插画" onerror="this.classList.add('image-missing')">
          <div class="result-heading">
            <span class="house-pill">${role.house}</span>
            <h1 class="result-name">${role.name}</h1>
            <p class="result-en">${role.en}</p>
          </div>
        </div>

        <div class="result-body">
          <article class="section-card radar-card radar-card-first">
          <p class="section-label">SHINOBI PROFILE</p>
            <h3>你的八维忍者人格地图</h3>
            <div class="radar-wrap">${buildRadar(scores, role.color)}</div>
            <div class="dimension-list">
              ${dimensionKeys.map((key) => `
                <div class="dimension-row">
                  <span>${dimensions[key].label}</span>
                  <div class="dimension-bar"><i style="width:${scores[key]}%"></i></div>
                  <output>${scores[key]}</output>
                </div>`).join("")}
            </div>
          </article>

          <article class="section-card spectrum-card">
            <p class="section-label">PERSONALITY SPECTRUM</p>
            <h3>你的忍者角色光谱</h3>
            <p class="spectrum-lead">你不是只有一个标签。主结果代表你的默认反应，下面的角色则显示你在不同关系、压力和人生阶段里可能切换的侧面。</p>
            <div class="spectrum-list">${spectrumRows}</div>
          </article>

          <div class="result-title-row">
            <h2 class="result-archetype">${role.title}</h2>
            <div class="match-score"><strong>${primary.similarity}%</strong><span>人格相似度</span></div>
          </div>
          <p class="result-summary">${role.summary}</p>

          <div class="tags">
            ${role.tags.map(([icon, text]) => `<div class="tag"><span><b>${icon}</b>${text}</span></div>`).join("")}
          </div>

          <blockquote class="quote-card">“${role.quote}”</blockquote>

          <article class="section-card deep-dive-card">
            <p class="section-label">DEEP READING</p>
            <h3>你的隐藏说明书</h3>
            <p class="deep-dive-lead">${report.core}</p>
            <div class="insight-grid">
              <div class="insight-item">
                <span class="insight-index">01</span>
                <h4>你最有价值的能力</h4>
                <ul class="insight-list">${report.strengths.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div class="insight-item">
                <span class="insight-index">02</span>
                <h4>别人容易误读你的地方</h4>
                <p>${report.blindspot}</p>
              </div>
              <div class="insight-item">
                <span class="insight-index">03</span>
                <h4>你真正需要的关系</h4>
                <p>${report.companion}</p>
              </div>
            </div>
          </article>

          <article class="section-card values-card">
            <p class="section-label">INNER ENGINE</p>
            <h3>是什么在驱动你</h3>
            <div class="values-grid">
              <div class="value-column">
                <span class="value-kicker">核心价值</span>
                <ul class="value-list">${report.values.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div class="value-column">
                <span class="value-kicker">关键动机</span>
                <ul class="value-list">${report.motivators.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </div>
          </article>

          ${sectionDefs.map(([label, title, key]) => `
            <article class="section-card">
              <p class="section-label">${label}</p>
              <h3>${title}</h3>
              <p>${role.sections[key]}</p>
            </article>`).join("")}

          <article class="section-card action-card">
            <p class="section-label">SHINOBI MISSION</p>
            <h3>给你的现实行动</h3>
            <p>${report.practice}</p>
            <ol class="mission-list">${report.microMoves.map((item) => `<li>${item}</li>`).join("")}</ol>
          </article>

          <article class="section-card runner-card runner-card-header">
            <img class="runner-avatar" src="${runnerRole.image}" alt="${runnerRole.name}Q版头像">
            <div>
              <p class="section-label">SECOND ARCHETYPE · ${runner.similarity}%</p>
              <h3>${runnerRole.name}</h3>
              <p>${runnerRole.title} · 你的隐藏人格侧面</p>
            </div>
          </article>

          <article class="runner-report" style="--runner-color:${runnerRole.color}">
            <div class="runner-report-heading">
              <div>
                <span class="house-pill">${runnerRole.house}</span>
                <h3>${runnerRole.title}</h3>
                <p class="runner-report-en">${runnerRole.en}</p>
              </div>
              <strong>${runner.similarity}%<small>隐藏相似度</small></strong>
            </div>
            <p class="runner-report-summary">${runnerRole.summary}</p>
            <div class="tags runner-tags">
              ${runnerRole.tags.map(([icon, text]) => `<div class="tag"><span><b>${icon}</b>${text}</span></div>`).join("")}
            </div>
            <blockquote class="quote-card runner-quote">“${runnerRole.quote}”</blockquote>

            <div class="runner-engine">
              <div class="runner-subcard">
                <span class="value-kicker">核心价值</span>
                <ul class="value-list">${runnerReport.values.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div class="runner-subcard">
                <span class="value-kicker">关键动机</span>
                <ul class="value-list">${runnerReport.motivators.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </div>

            <article class="runner-insight">
              <p class="section-label">SECOND READING</p>
              <h4>为什么这个人格会被你触发</h4>
              <p>${runnerReport.core}</p>
              <div class="runner-insight-columns">
                <div><b>隐藏优势</b><ul class="insight-list">${runnerReport.strengths.map((item) => `<li>${item}</li>`).join("")}</ul></div>
                <div><b>容易失控</b><p>${runnerReport.blindspot}</p></div>
              </div>
            </article>

            <div class="runner-section-grid">
              ${sectionDefs.map(([label, title, key]) => `
                <article class="runner-section-card">
                  <p class="section-label">${label}</p>
                  <h4>${title}</h4>
                  <p>${runnerRole.sections[key]}</p>
                </article>`).join("")}
            </div>

            <article class="runner-mission">
              <p class="section-label">HIDDEN MISSION</p>
              <h4>如何把第二人格用在正确的地方</h4>
              <p>${runnerReport.companion}</p>
              <p>${runnerReport.practice}</p>
              <ol class="runner-moves">${runnerReport.microMoves.map((item) => `<li>${item}</li>`).join("")}</ol>
            </article>
          </article>

          <div class="actions">
            <button class="secondary-btn" id="saveBtn">保存结果海报</button>
            <a class="ghost-btn xhs-share-btn" href="${xiaohongshuShareUrl}" target="_blank" rel="noopener noreferrer">邀请朋友测试</a>
            <a class="ghost-btn xhs-share-btn" href="${xiaohongshuShareUrl}" target="_blank" rel="noopener noreferrer">更多测试</a>
            <button class="ghost-btn" id="restartBtn">重新测试</button>
          </div>
          <p class="disclaimer">本测试为角色原型娱乐测评，不是心理诊断。角色与世界观相关权利归原权利方所有；本站为非官方独立创作。</p>
        </div>
      </section>`;

    document.querySelector("#restartBtn").addEventListener("click", startQuiz);
    document.querySelector("#saveBtn").addEventListener("click", saveResultCard);
  }

  function buildRadar(scores, color) {
    const cx = 150;
    const cy = 150;
    const radius = 102;
    const point = (index, value, extra = 0) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index / dimensionKeys.length);
      const r = radius * value / 100 + extra;
      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    };
    const polygons = [25, 50, 75, 100].map((level) => dimensionKeys.map((_, index) => point(index, level).join(",")).join(" "));
    const shapePoints = dimensionKeys.map((key, index) => point(index, scores[key]).join(",")).join(" ");

    const axes = dimensionKeys.map((_, index) => {
      const [x, y] = point(index, 100);
      return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
    }).join("");
    const labels = dimensionKeys.map((key, index) => {
      const [x, y] = point(index, 100, 25);
      const anchor = x < cx - 8 ? "end" : x > cx + 8 ? "start" : "middle";
      const baseline = y < cy - 8 ? "auto" : y > cy + 8 ? "hanging" : "middle";
      return `<text class="radar-label" x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="${baseline}">${dimensions[key].short}</text>`;
    }).join("");
    const dots = dimensionKeys.map((key, index) => {
      const [x, y] = point(index, scores[key]);
      return `<circle class="radar-dot" cx="${x}" cy="${y}" r="3"/>`;
    }).join("");

    return `<svg viewBox="0 0 300 300" role="img" aria-label="八维人格雷达图" style="--role-color:${color}">
      ${polygons.map((points) => `<polygon class="radar-grid" points="${points}"/>`).join("")}
      ${axes}
      <polygon class="radar-shape" points="${shapePoints}"/>
      ${dots}${labels}
    </svg>`;
  }

  async function saveResultCard() {
    const button = document.querySelector("#saveBtn");
    button.disabled = true;
    button.textContent = "正在生成结果图…";
    try {
      const blob = await drawShareCard();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "我的忍者人格海报.png";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast("结果海报已保存");
    } catch (error) {
      if (error?.name !== "AbortError") showToast("生成失败，请稍后再试");
    } finally {
      button.disabled = false;
      button.textContent = "保存结果海报";
    }
  }

  async function drawShareCard() {
    const { primary, runner } = state.result;
    const role = primary.character;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fafaf7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let qrImage = null;
    try {
      const image = await loadImage(role.image);
      drawImageCover(ctx, image, 0, 0, 1080, 790);
    } catch {
      const fallback = ctx.createLinearGradient(0, 0, 1080, 790);
      fallback.addColorStop(0, role.color);
      fallback.addColorStop(1, "#ded8ca");
      ctx.fillStyle = fallback;
      ctx.fillRect(0, 0, 1080, 790);
    }
    try {
      qrImage = await loadImage(storeQrImageUrl);
    } catch {
      qrImage = null;
    }

    const fade = ctx.createLinearGradient(0, 470, 0, 850);
    fade.addColorStop(0, "rgba(250,250,247,0)");
    fade.addColorStop(.75, "rgba(250,250,247,.96)");
    fade.addColorStop(1, "#fafaf7");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 440, 1080, 430);

    roundRect(ctx, 72, 650, 200, 60, 12);
    ctx.fillStyle = role.color;
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 27px -apple-system, PingFang SC, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(role.house, 172, 690);

    ctx.textAlign = "left";
    ctx.fillStyle = "#1a1916";
    const nameSize = role.name.length > 8 ? 70 : 86;
    ctx.font = `700 ${nameSize}px Iowan Old Style, Songti SC, serif`;
    ctx.fillText(role.name, 68, 790);
    ctx.fillStyle = role.color;
    ctx.font = "700 28px -apple-system, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText(role.en, 72, 836);

    ctx.fillStyle = "#1a1916";
    ctx.font = "700 46px Iowan Old Style, Songti SC, serif";
    ctx.fillText(role.title, 72, 918);
    ctx.textAlign = "right";
    ctx.fillStyle = role.color;
    ctx.font = "700 54px ui-monospace, monospace";
    ctx.fillText(`${primary.similarity}%`, 1008, 918);
    ctx.fillStyle = "#817d75";
    ctx.font = "24px -apple-system, PingFang SC, sans-serif";
    ctx.fillText("人格相似度", 1008, 951);

    role.tags.forEach(([icon, text], index) => {
      const x = 72 + index * 320;
      roundRect(ctx, x, 990, 296, 128, 22);
      ctx.fillStyle = "#fffdf8";
      ctx.fill();
      ctx.strokeStyle = "#e6dfd2";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = "#1a1916";
      ctx.font = "36px Apple Color Emoji, sans-serif";
      ctx.fillText(icon, x + 148, 1037);
      ctx.font = "700 25px -apple-system, PingFang SC, sans-serif";
      ctx.fillText(text, x + 148, 1083);
    });

    roundRect(ctx, 72, 1156, 736, 154, 24);
    ctx.fillStyle = "#23251f";
    ctx.fill();
    ctx.fillStyle = "#f8f5ed";
    ctx.textAlign = "center";
    ctx.font = "italic 30px Iowan Old Style, Songti SC, serif";
    wrapText(ctx, `“${role.quote}”`, 440, 1211, 650, 44, 2);

    if (qrImage) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(qrImage, 838, 1148, 170, 170);
      ctx.imageSmoothingEnabled = true;
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#8d8981";
    ctx.font = "22px -apple-system, PingFang SC, sans-serif";
    ctx.fillText(`第二人格：${runner.character.name} · 八维忍者测评`, 72, 1372);

    return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Canvas export failed")), "image/png"));
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function drawImageCover(ctx, image, x, y, width, height) {
    const sourceRatio = image.width / image.height;
    const targetRatio = width / height;
    let sx = 0, sy = 0, sw = image.width, sh = image.height;
    if (sourceRatio > targetRatio) {
      sw = image.height * targetRatio;
      sx = (image.width - sw) / 2;
    } else {
      sh = image.width / targetRatio;
      sy = Math.max(0, (image.height - sh) * .18);
    }
    ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const chars = [...text];
    const lines = [];
    let line = "";
    chars.forEach((char) => {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    lines.slice(0, maxLines).forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
  }

  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  render();
})();
