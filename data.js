window.TEST_DATA = (() => {
  const dimensions = {
    courage: { label: "勇气", short: "勇气" },
    bond: { label: "羁绊", short: "羁绊" },
    insight: { label: "洞察", short: "洞察" },
    ambition: { label: "野心", short: "野心" },
    freedom: { label: "自由", short: "自由" },
    empathy: { label: "共情", short: "共情" },
    discipline: { label: "克制", short: "克制" },
    instinct: { label: "直觉", short: "直觉" }
  };

  const questions = [
    {
      scene: "临时任务",
      title: "项目突然提前截止，所有人都在等一个决定。你会？",
      options: [
        { text: "先站出来分配任务，边做边修正", weights: { courage: 4, bond: 2, instinct: 3 } },
        { text: "迅速拆解问题，找出最短路径", weights: { insight: 4, discipline: 3, courage: 1 } },
        { text: "先确认谁最需要支持，避免队伍散掉", weights: { bond: 4, empathy: 4, discipline: 1 } },
        { text: "重新定义目标，保住最有价值的结果", weights: { ambition: 4, freedom: 3, insight: 2 } }
      ]
    },
    {
      scene: "朋友风波",
      title: "你发现朋友被误解，旁边的人都劝你别惹麻烦。你会？",
      options: [
        { text: "直接把事实讲清楚，哪怕场面变僵", weights: { courage: 4, bond: 3, freedom: 2 } },
        { text: "先私下找朋友确认，再决定怎么处理", weights: { empathy: 3, insight: 3, discipline: 2 } },
        { text: "搜集证据，用最稳妥的方式翻盘", weights: { insight: 4, discipline: 4, ambition: 1 } },
        { text: "陪朋友先离开现场，之后再一起面对", weights: { bond: 5, empathy: 3, courage: 1 } }
      ]
    },
    {
      scene: "不合理规则",
      title: "你遇到一条明显不合理、却人人默认遵守的规则。你会？",
      options: [
        { text: "先问一句：为什么一定要这样？", weights: { freedom: 4, courage: 2, insight: 2 } },
        { text: "找到漏洞，让规则失去伤人的部分", weights: { insight: 4, freedom: 3, instinct: 2 } },
        { text: "先遵守，再在合适的时机推动修改", weights: { discipline: 4, empathy: 2, ambition: 2 } },
        { text: "只要伤害到重要的人，我会直接拒绝", weights: { courage: 5, bond: 4, freedom: 2 } }
      ]
    },
    {
      scene: "陌生任务",
      title: "你被派去一个完全不了解的地方完成任务，最先想什么？",
      options: [
        { text: "终于有机会证明自己了", weights: { ambition: 4, courage: 3, freedom: 2 } },
        { text: "地图、情报、退路，一个都不能少", weights: { insight: 4, discipline: 4, instinct: 1 } },
        { text: "谁和我一起去？我不想让队友落单", weights: { bond: 5, empathy: 3, courage: 1 } },
        { text: "先听身体的感觉，现场会告诉我答案", weights: { instinct: 5, freedom: 3, courage: 2 } }
      ]
    },
    {
      scene: "公开批评",
      title: "你投入很久的作品被人当众批评，你的第一反应是？",
      options: [
        { text: "记住重点，回去把能改的都改掉", weights: { discipline: 4, insight: 3, ambition: 2 } },
        { text: "先问对方到底看见了什么问题", weights: { courage: 2, insight: 4, freedom: 2 } },
        { text: "表面没事，心里会记很久", weights: { discipline: 3, empathy: 2, bond: 2 } },
        { text: "如果他说得不对，我会当场顶回去", weights: { courage: 4, freedom: 4, instinct: 2 } }
      ]
    },
    {
      scene: "遭到背叛",
      title: "一个你很信任的人背叛了你，你最接近的反应是？",
      options: [
        { text: "先把自己抽离，等情绪过去再判断", weights: { discipline: 4, insight: 3, empathy: 1 } },
        { text: "一定要知道他为什么这么做", weights: { insight: 4, bond: 2, empathy: 2 } },
        { text: "我可以失望，但不会轻易放弃这段关系", weights: { bond: 5, empathy: 4, courage: 1 } },
        { text: "既然选择了背叛，就承担后果", weights: { ambition: 3, freedom: 3, courage: 4 } }
      ]
    },
    {
      scene: "独处时刻",
      title: "长时间独处时，你最容易进入哪种状态？",
      options: [
        { text: "把很多旧事重新想一遍", weights: { insight: 3, empathy: 3, discipline: 2 } },
        { text: "脑子里冒出一些没人理解的新想法", weights: { instinct: 4, freedom: 4, insight: 2 } },
        { text: "终于不用照顾所有人的情绪了", weights: { discipline: 3, freedom: 3, courage: 1 } },
        { text: "开始规划下一件想赢下来的事", weights: { ambition: 5, insight: 2, discipline: 2 } }
      ]
    },
    {
      scene: "高手局",
      title: "你进入一个高手很多、竞争激烈的新环境，最想做什么？",
      options: [
        { text: "找到一个值得追赶的人，狠狠干一场", weights: { ambition: 4, courage: 4, freedom: 1 } },
        { text: "观察每个人的长处，找到自己的位置", weights: { insight: 4, discipline: 2, bond: 2 } },
        { text: "先把基础练到没人能忽略我", weights: { discipline: 5, ambition: 3, courage: 1 } },
        { text: "不想复制别人，我要走自己的路", weights: { freedom: 5, instinct: 3, courage: 2 } }
      ]
    },
    {
      scene: "两难选择",
      title: "没有完美答案的道德难题里，你更相信什么？",
      options: [
        { text: "先保护眼前最容易受伤的人", weights: { empathy: 5, bond: 3, courage: 2 } },
        { text: "把长期后果算清楚，再做决定", weights: { insight: 5, discipline: 3, ambition: 1 } },
        { text: "不能让别人替我决定什么是对的", weights: { freedom: 4, courage: 3, instinct: 3 } },
        { text: "即使代价很大，也要守住承诺", weights: { bond: 5, discipline: 4, courage: 2 } }
      ]
    },
    {
      scene: "带队时刻",
      title: "如果由你带一个六人小队，你会是什么风格？",
      options: [
        { text: "我先冲，大家跟上我的节奏", weights: { courage: 5, instinct: 3, bond: 2 } },
        { text: "让每个人都知道自己为什么而战", weights: { bond: 4, empathy: 3, ambition: 2 } },
        { text: "提前设计好几套方案，减少失误", weights: { insight: 4, discipline: 4, courage: 1 } },
        { text: "我不抢指挥，但关键时刻会接管局面", weights: { discipline: 3, insight: 3, courage: 3 } }
      ]
    },
    {
      scene: "机会来临",
      title: "一个能让你被所有人看见的机会出现了，你会？",
      options: [
        { text: "先拿下再说，风险值得冒", weights: { ambition: 5, courage: 4, instinct: 1 } },
        { text: "确认它是不是我真正想要的", weights: { insight: 3, freedom: 3, discipline: 2 } },
        { text: "如果会牺牲重要的人，我不会要", weights: { bond: 5, empathy: 4, discipline: 1 } },
        { text: "把机会拆成可控的几步，慢慢吃下来", weights: { discipline: 4, insight: 4, ambition: 2 } }
      ]
    },
    {
      scene: "公开争论",
      title: "会议上出现针锋相对的分歧，你更像哪一种？",
      options: [
        { text: "直接说出我认为最重要的那句话", weights: { courage: 4, freedom: 2, instinct: 2 } },
        { text: "把情绪和事实分开，让大家回到问题上", weights: { insight: 4, discipline: 4, empathy: 1 } },
        { text: "先让双方都感觉被听见，再找交集", weights: { empathy: 5, bond: 3, insight: 2 } },
        { text: "如果目标不值得争，我会及时退出", weights: { freedom: 4, discipline: 3, ambition: 1 } }
      ]
    },
    {
      scene: "进入新群体",
      title: "刚加入一个完全陌生的群体，你会怎么找到位置？",
      options: [
        { text: "先观察谁真正影响局面", weights: { insight: 5, ambition: 2, discipline: 2 } },
        { text: "主动和最边缘的人聊起来", weights: { empathy: 5, bond: 3, freedom: 1 } },
        { text: "先把手上的事做到让人放心", weights: { discipline: 5, ambition: 2, bond: 1 } },
        { text: "不急着融入，保持自己的节奏", weights: { freedom: 4, instinct: 3, discipline: 2 } }
      ]
    },
    {
      scene: "计划泡汤",
      title: "精心安排的计划临时被取消，你多半会？",
      options: [
        { text: "马上改成另一个能出发的版本", weights: { courage: 3, instinct: 4, freedom: 2 } },
        { text: "复盘哪里出了问题，避免下次重来", weights: { insight: 4, discipline: 4, ambition: 1 } },
        { text: "先确认大家是不是都还好", weights: { bond: 4, empathy: 4, courage: 1 } },
        { text: "算了，换一条完全不同的路", weights: { freedom: 5, instinct: 3, ambition: 1 } }
      ]
    },
    {
      scene: "喜欢的人",
      title: "你发现自己真的喜欢上一个人，最符合你的方式是？",
      options: [
        { text: "找一个关键时刻，让对方知道我会出现", weights: { courage: 3, bond: 4, empathy: 2 } },
        { text: "慢慢观察，确认这是不是双向靠近", weights: { discipline: 3, insight: 3, empathy: 3 } },
        { text: "直接说，不想把真心藏成谜语", weights: { courage: 5, freedom: 3, instinct: 2 } },
        { text: "先把自己变得更值得被看见", weights: { ambition: 4, discipline: 3, insight: 2 } }
      ]
    },
    {
      scene: "替人保密",
      title: "朋友告诉你一个秘密，但这个秘密可能伤害另一个人。你会？",
      options: [
        { text: "先陪朋友一起面对，而不是立刻揭穿", weights: { bond: 5, empathy: 3, courage: 1 } },
        { text: "把所有相关的人都纳入考虑", weights: { empathy: 4, insight: 4, discipline: 2 } },
        { text: "我不能替别人背负这个选择", weights: { freedom: 4, discipline: 3, courage: 2 } },
        { text: "直接逼朋友修正，不让问题继续扩大", weights: { courage: 4, ambition: 2, discipline: 3 } }
      ]
    },
    {
      scene: "突发状况",
      title: "突发状况发生，大家同时看向你。你会？",
      options: [
        { text: "先动起来，停在原地只会更糟", weights: { courage: 5, instinct: 4, bond: 1 } },
        { text: "用十秒确认最关键的变量", weights: { insight: 5, discipline: 3, courage: 1 } },
        { text: "先找到最害怕的人，让他稳下来", weights: { empathy: 5, bond: 4, courage: 1 } },
        { text: "把混乱变成一次改变局面的机会", weights: { ambition: 4, freedom: 3, instinct: 3 } }
      ]
    },
    {
      scene: "失败之后",
      title: "你做错一件可能影响团队的事，第一步是？",
      options: [
        { text: "承认、补救，先把损失降下来", weights: { courage: 4, bond: 3, discipline: 3 } },
        { text: "找出系统哪里让错误变得容易发生", weights: { insight: 5, discipline: 4, ambition: 1 } },
        { text: "一个人扛下责任，不让别人被牵连", weights: { bond: 4, courage: 3, discipline: 2 } },
        { text: "把它当作重新设计规则的机会", weights: { freedom: 3, ambition: 4, insight: 2 } }
      ]
    },
    {
      scene: "未来画面",
      title: "想象五年后的自己，哪幅画面最接近你的愿望？",
      options: [
        { text: "身边的人都还在，我们一起走得更远", weights: { bond: 5, empathy: 4, courage: 1 } },
        { text: "我终于拥有选择生活方式的自由", weights: { freedom: 5, instinct: 3, ambition: 2 } },
        { text: "我成了那个能保护别人、解决难题的人", weights: { courage: 4, ambition: 3, bond: 2 } },
        { text: "我把一套复杂的东西真正做成了", weights: { insight: 4, discipline: 4, ambition: 3 } }
      ]
    },
    {
      scene: "最后的选择",
      title: "如果只能保留一种力量，你最不愿失去什么？",
      options: [
        { text: "在害怕时仍然向前的勇气", weights: { courage: 5, discipline: 2, instinct: 2 } },
        { text: "和重要的人彼此选择的羁绊", weights: { bond: 5, empathy: 4, courage: 1 } },
        { text: "看穿局面、找到答案的能力", weights: { insight: 5, discipline: 3, ambition: 1 } },
        { text: "不被任何命运写死的自由", weights: { freedom: 5, ambition: 2, instinct: 4 } }
      ]
    },
    {
      scene: "师徒关系",
      title: "一个你尊敬的人指出了你的短板，你会怎么回应？",
      options: [
        { text: "马上练，下一次用结果回答", weights: { discipline: 5, ambition: 3, courage: 2 } },
        { text: "追问他为什么这样判断", weights: { insight: 5, freedom: 2, courage: 1 } },
        { text: "记住这句话，但不让它定义我", weights: { freedom: 4, instinct: 3, discipline: 2 } },
        { text: "感谢他愿意认真看见我", weights: { bond: 4, empathy: 4, discipline: 1 } }
      ]
    },
    {
      scene: "旧关系",
      title: "一个曾经伤害过你的人突然回来求助，你会？",
      options: [
        { text: "先确认他现在是不是值得信任", weights: { insight: 4, discipline: 3, empathy: 2 } },
        { text: "只要情况紧急，我先救人再说", weights: { courage: 4, empathy: 4, bond: 2 } },
        { text: "我不想再让过去决定我的行为", weights: { freedom: 4, courage: 3, instinct: 2 } },
        { text: "帮助可以，但边界和代价要说清楚", weights: { discipline: 5, insight: 3, ambition: 1 } }
      ]
    },
    {
      scene: "力量边界",
      title: "当你发现自己拥有比别人更多的资源，你会怎么用？",
      options: [
        { text: "先把最危险的地方补上", weights: { empathy: 4, bond: 3, discipline: 2 } },
        { text: "做成一套长期有效的系统", weights: { insight: 4, ambition: 3, discipline: 4 } },
        { text: "保留选择权，不让资源反过来控制我", weights: { freedom: 5, instinct: 3, discipline: 1 } },
        { text: "把它变成一次改变规则的机会", weights: { ambition: 5, courage: 3, freedom: 2 } }
      ]
    },
    {
      scene: "你的名字",
      title: "如果别人只记住你做过的一件事，你希望是什么？",
      options: [
        { text: "我曾经让一群人没有放弃彼此", weights: { bond: 5, empathy: 4, courage: 1 } },
        { text: "我把一个不可能的问题做出了答案", weights: { insight: 5, discipline: 3, ambition: 2 } },
        { text: "我没有活成别人替我写好的样子", weights: { freedom: 5, courage: 3, instinct: 3 } },
        { text: "我在最关键的时刻站了出来", weights: { courage: 5, bond: 2, ambition: 2 } }
      ]
    }
  ];

  const characters = {
    naruto: {
      name: "漩涡鸣人", en: "Naruto Uzumaki", house: "木叶 · 火之意志", color: "#d96b2b",
      image: "assets/characters/naruto-anime.png", title: "逆风型联结者",
      tags: [["🔥", "越难越想证明"], ["🤝", "伙伴不能掉队"], ["☀️", "把孤独变成力量"]],
      quote: "我不会因为被否定，就放弃成为我想成为的人。",
      summary: "你不是因为不害怕才向前，而是很难看着重要的人独自承担。你把被理解的渴望，变成了持续靠近他人的行动力。",
      profile: { courage: 95, bond: 100, insight: 55, ambition: 60, freedom: 85, empathy: 88, discipline: 38, instinct: 75 },
      sections: {
        public: "别人看到的是直球、热烈和有点不服输。你在混乱里反而很容易成为那个把大家重新拉到一起的人。",
        motive: "你真正想要的不是压过所有人，而是证明自己值得被留下、被选择，也能让别人不再孤单。",
        shadow: "你可能把所有责任都揽到自己身上，用行动代替求助；越在乎，越容易冲得太快。",
        relationship: "你爱得直接，擅长在关键时刻出现。你需要一个既支持你的热烈，也能提醒你休息的人。",
        work: "你适合开荒、危机处理、带动团队和能看见真实影响的事情。重复且没有意义的规则会迅速消耗你。",
        growth: "真正的升级不是更能扛，而是学会把伙伴拉进来。让别人分担，不会削弱你的力量。"
      }
    },
    sasuke: {
      name: "宇智波佐助", en: "Sasuke Uchiha", house: "木叶 · 孤锋之路", color: "#4b6788",
      image: "assets/characters/sasuke-anime.png", title: "孤锋型追寻者",
      tags: [["🌑", "目标感很锋利"], ["⚔️", "不接受被定义"], ["🪞", "沉默里有旧账"]],
      quote: "我会走自己的路，即使那条路没有人陪我。",
      summary: "你对失去、失败和被安排极其敏感，因此把人生压缩成一条必须走通的路。冷静不是你没有情感，而是情感太重。",
      profile: { courage: 82, bond: 55, insight: 86, ambition: 92, freedom: 78, empathy: 42, discipline: 76, instinct: 82 },
      sections: {
        public: "你给人的感觉是克制、难接近、目标清晰。你不喜欢解释自己，更愿意用结果让别人闭嘴。",
        motive: "你渴望找回对命运的控制感，不想让重要的东西再次被别人轻易夺走。",
        shadow: "压力下，你会把关系视为干扰，甚至用疏远保护自己。越在意的人，越可能被你推到安全距离之外。",
        relationship: "你不是不需要亲密，而是需要非常确定的理解。真正靠近你，需要耐心，也需要不被你的沉默吓退。",
        work: "你适合高难度、强目标、需要长期精进的领域。你能走很远，但要小心别把胜负变成唯一的燃料。",
        growth: "目标可以留下，孤独不必留下。允许别人看见你的软处，会让你的力量变得更完整。"
      }
    },
    sakura: {
      name: "春野樱", en: "Sakura Haruno", house: "木叶 · 锤炼之心", color: "#a84758",
      image: "assets/characters/sakura-anime.png", title: "锤炼型守护者",
      tags: [["🌸", "越练越稳"], ["🩺", "关键时刻兜底"], ["💥", "温柔不是退让"]],
      quote: "我不是等着被保护的人，我会把自己练成答案。",
      summary: "你相信能力可以被一点点练出来。你有强烈的现实感与责任感，平时不抢镜，真正需要时却能把混乱重新稳住。",
      profile: { courage: 78, bond: 86, insight: 85, ambition: 68, freedom: 40, empathy: 80, discipline: 88, instinct: 55 },
      sections: {
        public: "你看起来清醒、可靠、标准不低。别人可能只看到你的强势，却忽略了你背后持续的自我要求。",
        motive: "你想拥有足够的能力，让自己和在乎的人不必把命运交给别人。",
        shadow: "当焦虑升高，你会更想纠正、安排和证明自己是对的，也可能忘记先照顾自己的情绪。",
        relationship: "你的爱藏在提醒、解决问题和关键时刻的保护里。你需要一个欣赏你的能力、也允许你偶尔脆弱的人。",
        work: "医疗、策略、项目管理、专业服务和复杂问题拆解都适合你。你能把天赋变成稳定交付。",
        growth: "别把坚强变成永远不求助。能被照顾不是退步，而是让你拥有更长的战斗周期。"
      }
    },
    kakashi: {
      name: "旗木卡卡西", en: "Kakashi Hatake", house: "木叶 · 静默策略家", color: "#516b72",
      image: "assets/characters/kakashi-anime.png", title: "松弛型战略家",
      tags: [["🧭", "先看清再出手"], ["📖", "松弛只是表面"], ["🛡️", "把人带回家"]],
      quote: "规则当然重要，但真正重要的是不要让伙伴被留下。",
      summary: "你习惯把情绪放在后面，把局势看清楚再行动。你看似漫不经心，实际上很会在关键时刻托住一群人。",
      profile: { courage: 78, bond: 82, insight: 95, ambition: 48, freedom: 65, empathy: 75, discipline: 80, instinct: 82 },
      sections: {
        public: "你给人聪明、从容、有点懒散的印象。真正熟悉你的人知道，你一直在默默观察所有人的状态。",
        motive: "你不想让过去的遗憾在新关系里重演，所以会把保护变成一种不动声色的责任。",
        shadow: "你可能用玩笑和距离感遮住疲惫，等到问题已经堆高才承认自己也需要帮助。",
        relationship: "你尊重边界，也愿意在关键时刻出现。你需要成熟、诚实、不把沉默误解成冷漠的关系。",
        work: "策略、带队、危机判断和需要同时看人看局的岗位很适合你。你是复杂局面的降噪器。",
        growth: "不要总把自己放在观察席。主动说出在乎，会让别人也有机会保护你。"
      }
    },
    shikamaru: {
      name: "奈良鹿丸", en: "Shikamaru Nara", house: "木叶 · 云端策士", color: "#6b7961",
      image: "assets/characters/shikamaru-anime.png", title: "低耗型策士",
      tags: [["☁️", "不做无效努力"], ["♟️", "总能多想两步"], ["🤲", "懒得说但会负责"]],
      quote: "麻烦归麻烦，既然轮到我了，就不能让事情更糟。",
      summary: "你不迷恋成为最响亮的人，却很擅长看见结构、风险和每个人真正能承担的部分。你的懒散是一种对无效消耗的拒绝。",
      profile: { courage: 68, bond: 72, insight: 100, ambition: 42, freedom: 58, empathy: 70, discipline: 88, instinct: 75 },
      sections: {
        public: "你显得冷静、聪明、懒得争。真正遇到大事时，你往往比那些最积极的人更早看见问题的全貌。",
        motive: "你想让重要的人少受一点无谓的伤害，也想让人生尽量保留真实的选择余地。",
        shadow: "你可能用“太麻烦了”提前退出，或者因为看见太多可能性而迟迟不愿做决定。",
        relationship: "你的忠诚不是高调表白，而是把对方放进你的计划里。你需要轻松、可靠、不逼你表演的人。",
        work: "战略、资源配置、流程设计、研究和复杂项目管理是你的强项。你适合解决别人觉得麻烦的事。",
        growth: "别把能力藏在低调里。偶尔主动争取，也不会让生活变得吵闹。"
      }
    },
    itachi: {
      name: "宇智波鼬", en: "Itachi Uchiha", house: "木叶 · 隐秘守护", color: "#5a3f51",
      image: "assets/characters/itachi-anime.png", title: "隐忍型守护者",
      tags: [["🕯️", "把痛藏得很深"], ["🖤", "认定后很长情"], ["🌘", "先承担再解释"]],
      quote: "真正的力量，不是让别人理解你，而是知道自己为什么选择。",
      summary: "你把强烈情感收进很深的地方，用专业、克制和距离维持局面。别人可能低估你的温柔，因为你习惯做难以被看见的事。",
      profile: { courage: 92, bond: 95, insight: 98, ambition: 40, freedom: 52, empathy: 70, discipline: 100, instinct: 88 },
      sections: {
        public: "你显得安静、精准、情绪稳定，几乎不让外界轻易改变你的判断。",
        motive: "你想守住承诺与更大的安全感，哪怕这意味着自己要承受误解。",
        shadow: "你容易把承担变成孤立，认为只要自己扛住，别人就不会被伤害。",
        relationship: "你的感情深、慢、排他，表达却非常稀少。你需要有人愿意理解沉默，也需要练习把爱说出来。",
        work: "长期研究、保密任务、专业治理和高压决策都适合你。你能承担复杂，但不必永远独自承担。",
        growth: "忠诚不等于牺牲到底。让关系共享真相，能把你的守护从悲壮变成真正的连接。"
      }
    },
    hinata: {
      name: "日向雏田", en: "Hinata Hyuga", house: "木叶 · 温柔坚定", color: "#647aa0",
      image: "assets/characters/hinata-anime.png", title: "慢热型坚定者",
      tags: [["🌙", "安静但有底线"], ["🫧", "先看见别人"], ["🌱", "害怕也会站出"]],
      quote: "我可以紧张，但我仍然可以向前一步。",
      summary: "你的力量不是天生笃定，而是在一次次害怕后仍愿意多走一步。你温和、敏锐、不抢位置，却有非常坚实的是非感。",
      profile: { courage: 72, bond: 90, insight: 58, ambition: 35, freedom: 42, empathy: 98, discipline: 72, instinct: 78 },
      sections: {
        public: "你可能显得安静、好说话，甚至偶尔不够自信。但熟悉你的人知道，你会在真正需要时站稳。",
        motive: "你希望证明温柔和勇敢可以同时存在，也希望自己有能力保护所珍惜的关系。",
        shadow: "你容易先相信别人比自己更合适，把机会让出去，忘记自己的感受同样重要。",
        relationship: "你的爱稳定、细致、没有表演感。你需要能看见缓慢成长、愿意给出明确回应的人。",
        work: "长期积累、陪伴成长、教育、照护和需要耐心的领域能让你发光。",
        growth: "别把勇气只留到最后关头。更早表达、更早争取，你会发现自己不必被逼到墙角才有力量。"
      }
    },
    gaara: {
      name: "我爱罗", en: "Gaara", house: "砂隐 · 防御型领袖", color: "#9b6a45",
      image: "assets/characters/gaara-anime.png", title: "防御型领袖",
      tags: [["🏜️", "边界感很强"], ["🛡️", "保护是新生"], ["🪨", "沉默里有重量"]],
      quote: "只有学会理解别人，力量才不会只剩下孤独。",
      summary: "你曾经很早学会保护自己，因此边界感强、情绪收得住。真正成熟之后，你会把防御转成一种可靠的保护力。",
      profile: { courage: 86, bond: 70, insight: 74, ambition: 68, freedom: 45, empathy: 80, discipline: 90, instinct: 82 },
      sections: {
        public: "你给人安静、难以撼动、判断明确的感觉。你不轻易信任，却会认真对待自己承认的责任。",
        motive: "你想证明自己不必被过去定义，也想让别人不再经历你曾经经历过的孤独。",
        shadow: "当不安升高，你会把边界筑得太高，让想靠近的人只能在门外等待。",
        relationship: "你需要很长时间建立信任，但一旦认定就会非常稳定。你要练习让关心不只停留在保护层面。",
        work: "治理、管理、危机控制和需要强边界的工作适合你。你能把经历过的伤变成判断力。",
        growth: "安全感不只来自防守，也来自允许别人参与。真正的强大，是不用永远保持戒备。"
      }
    },
    rocklee: {
      name: "李洛克", en: "Rock Lee", house: "木叶 · 青春修行", color: "#2e7b57",
      image: "assets/characters/rocklee-anime.png", title: "热血型修行者",
      tags: [["🥊", "笨功夫也能赢"], ["🌞", "把真心练成力量"], ["🏃", "今天比昨天多一步"]],
      quote: "天赋决定起点，但我可以决定自己走多远。",
      summary: "你不太相信捷径，更相信反复练习、守住承诺和一次次重新站起来。你给人的能量很直接，也很难被真正击垮。",
      profile: { courage: 96, bond: 82, insight: 42, ambition: 75, freedom: 62, empathy: 70, discipline: 100, instinct: 55 },
      sections: {
        public: "你热烈、坦诚、行动先于解释。你可能不是最会算的人，却是最容易让别人也愿意继续的人。",
        motive: "你想证明限制不是终点，努力本身就可以成为一种尊严。",
        shadow: "你有时会把坚持变成硬撑，忽略身体和情绪其实也需要恢复。",
        relationship: "你表达喜欢的方式很直接，会用陪伴和行动让对方放心。你需要同样真诚、不嘲笑热情的人。",
        work: "训练、执行、运动、销售、现场管理和需要长期积累的技能型工作都适合你。",
        growth: "努力不是唯一答案。学会调整节奏，会让你的热情跑得更久。"
      }
    },
    tsunade: {
      name: "纲手", en: "Tsunade", house: "木叶 · 破局治愈", color: "#4f7d54",
      image: "assets/characters/tsunade-anime.png", title: "破局型治愈者",
      tags: [["💚", "先把人救回来"], ["👊", "温柔也能很重"], ["🏛️", "敢对旧规矩动手"]],
      quote: "真正的领导，不是坐在最安全的地方发号施令。",
      summary: "你见过代价，所以不迷信漂亮口号。你有很强的判断力和保护欲，也敢在旧系统已经失效时亲手重建。",
      profile: { courage: 90, bond: 88, insight: 92, ambition: 72, freedom: 58, empathy: 90, discipline: 86, instinct: 78 },
      sections: {
        public: "你强势、清醒、判断很快。别人会把你当作关键时刻能扛事的人，却未必知道你承担了多少情绪。",
        motive: "你想让失去不再只是失去，把经验转成能保护更多人的制度和能力。",
        shadow: "你可能用控制和高标准遮住害怕，再累也不愿承认自己需要依靠。",
        relationship: "你不喜欢暧昧的承诺，但会用实际行动保护认定的人。你需要成熟、坦诚、能并肩承担的人。",
        work: "医疗、管理、改革、危机决策和需要把人放在第一位的领导岗位适合你。",
        growth: "不是每个离开都需要你负责。把一部分重量交回给别人，也是在保护自己。"
      }
    },
    jiraiya: {
      name: "自来也", en: "Jiraiya", house: "木叶 · 流浪导师", color: "#b84936",
      image: "assets/characters/jiraiya-anime.png", title: "玩世型导师",
      tags: [["🍶", "表面不正经"], ["📜", "一直在观察世界"], ["🐸", "关键时刻很可靠"]],
      quote: "真正的故事，是你跌倒以后仍然愿意把答案交给下一代。",
      summary: "你看起来随性、爱开玩笑，不喜欢被规矩绑住；但你对人的成长和时代的方向有很深的责任感。",
      profile: { courage: 84, bond: 86, insight: 88, ambition: 55, freedom: 90, empathy: 82, discipline: 58, instinct: 94 },
      sections: {
        public: "你幽默、会活跃气氛，也常把真正重要的判断藏在玩笑后面。人们容易低估你的观察深度。",
        motive: "你想看见下一代走得比自己更远，即使自己不能陪他们走完整段路。",
        shadow: "你可能用自由和玩世不恭逃开深情，等到真正告别时才发现有些话没说出口。",
        relationship: "你重视灵魂上的相互理解，喜欢给对方空间，也会在关键时刻挡在前面。",
        work: "创作、教育、调查、跨界探索和需要现场直觉的工作很适合你。",
        growth: "把经验留成作品，把关心说得更清楚。导师不只是在远处看着，也可以好好道别。"
      }
    },
    orochimaru: {
      name: "大蛇丸", en: "Orochimaru", house: "音隐 · 极限探索", color: "#5b8d7a",
      image: "assets/characters/orochimaru-anime.png", title: "极限型探索者",
      tags: [["🧪", "对未知上瘾"], ["🐍", "不接受终点"], ["🔬", "把禁区变成问题"]],
      quote: "未知并不可怕，可怕的是把别人的边界当成自己的终点。",
      summary: "你对世界的运行方式有近乎执拗的好奇，不轻易接受标准答案。你擅长把禁区拆成问题，也必须学会为力量设边界。",
      profile: { courage: 78, bond: 28, insight: 100, ambition: 96, freedom: 94, empathy: 25, discipline: 82, instinct: 95 },
      sections: {
        public: "你聪明、难以预测、很少被传统价值框住。你不只是想赢，更想知道别人不知道的东西。",
        motive: "你想延长选择、能力与探索的边界，不愿接受任何人替你规定终点。",
        shadow: "当好奇失去边界，别人会变成实验材料，连你自己也可能被目标吞没。",
        relationship: "你不容易被关系驯服，却会被真正聪明、坦诚、不惧怕你的人吸引。",
        work: "科研、技术、创新、战略和探索未知边界的领域适合你，但必须建立清晰伦理。",
        growth: "不是所有能做到的事都值得做到。真正高级的探索，是知道什么时候停手。"
      }
    }
  };

  const reportExtras = {
    naruto: {
      core: "你的人格底色是‘主动创造连接’。你不太愿意把人生交给旁观者视角，哪怕局面很糟，也会先问一句：现在有没有什么是我能做的？这份向前冲的能量，来自你对孤独的敏感，也来自你希望每个人都拥有重新开始的机会。",
      strengths: ["把陌生人带进同一个目标", "在低气压里制造行动感", "用真诚换来长期信任"],
      blindspot: "你容易把‘我可以’变成‘只能我来’，一边鼓励所有人，一边悄悄透支自己。别人未必需要一个永远乐观的你，他们也需要知道你什么时候累、什么时候想被接住。",
      companion: "适合你的关系不是单纯崇拜你的热烈，而是能和你一起承担、在你冲太快时把你拉回现实的人。你越愿意说出脆弱，关系越不需要靠不断证明来维持。",
      practice: "下一阶段的忍道：把一个你习惯独自扛下的任务，明确交给值得信任的人；然后观察，合作不会让你失去主导权，反而会让你的能量走得更远。"
    },
    sasuke: {
      core: "你的人格底色是‘把失去转化为方向’。你对模糊、失控和被安排有很强的警觉，所以会不断打磨能力，让自己拥有不被轻易夺走的选择权。你不是没有温度，而是习惯先确认安全，再决定要不要靠近。",
      strengths: ["在复杂目标里保持锋利", "持续追问事情的根源", "不依赖掌声也能完成长期训练"],
      blindspot: "你容易把孤独误认为专注，把不求助误认为强大。当你只允许结果替自己说话时，别人看不见你真正想守住的东西，也不知道该如何走近你。",
      companion: "适合你的关系需要清晰、尊重边界，也能在你沉默时保持稳定的人。真正的亲密不是逼你立刻解释，而是让你慢慢发现：表达需求并不会把控制权交出去。",
      practice: "下一阶段的忍道：在一个重要目标之外，保留一个不以胜负衡量的关系或兴趣；让自己练习被理解，而不必先拿出一份完美答案。"
    },
    sakura: {
      core: "你的人格底色是‘把在乎练成能力’。你很少满足于只表达善意，更希望自己真的有本事解决问题、保护别人、把结果交付出来。你的成长通常不是突然开窍，而是在一次次复盘和修正里变得可靠。",
      strengths: ["把情绪转化成可执行方案", "在高压局面里稳定交付", "用专业感建立安全感"],
      blindspot: "你很容易把标准抬得太高，最后连休息都像一种需要被批准的奖励。你可以有原则，也可以承认自己今天已经做到够好了，不必每次都用更强来证明价值。",
      companion: "适合你的关系是欣赏你的能力，却不把你当成永远的解决方案的人。你需要能够和你讨论分工、情绪与需求的伙伴，而不是只在出问题时来找你的求助者。",
      practice: "下一阶段的忍道：把‘我来处理’改成‘我们一起拆开处理’；每周留一段没有产出要求的时间，让身体和情绪也进入你的照护范围。"
    },
    kakashi: {
      core: "你的人格底色是‘在混乱中保留判断’。你很少急着抢镜，更擅长先把信息、人心和风险放到同一张地图上。你的松弛不是漫不经心，而是一种经历过代价后形成的节奏感。",
      strengths: ["快速识别真正的风险", "让不同类型的人各就各位", "用幽默降低冲突与恐惧"],
      blindspot: "你太擅长照顾全局，反而容易把自己的疲惫藏到最后。用玩笑带过重要感受很有效，却也可能让别人误以为你永远不需要被照顾。",
      companion: "适合你的关系要有成熟的边界感，也要有人愿意在你负责之前先问一句‘你还好吗’。你不需要始终扮演那个最清醒的人，可以把一部分方向感交给别人。",
      practice: "下一阶段的忍道：在一次会议、合作或亲密对话里，主动说出一个真实需求，不要只提供解决方案；被看见本身也是一种关系贡献。"
    },
    shikamaru: {
      core: "你的人格底色是‘用最少的消耗解决最难的问题’。你不热衷把忙碌当成价值，更愿意看清结构、排序优先级，然后把精力投向真正重要的地方。你的责任感通常比你的野心更早出现。",
      strengths: ["看见别人忽略的系统性问题", "在资源有限时做出取舍", "用低调换来稳定而准确的判断"],
      blindspot: "你知道事情有多麻烦，所以有时在开始之前就先替自己算完了成本。过度等待最佳时机，会让你错过那些只能边走边修正的机会。",
      companion: "适合你的关系要轻松、可靠，不逼你持续表演热情；但也需要有人提醒你，沉默并不总能让别人读懂你的在乎。把计划里的位置让给一个人，是你很高级的表达。",
      practice: "下一阶段的忍道：选一个七十分就能启动的目标，在信息不完整时先走第一步；你不需要把全部路线都算完，行动也会提供新的情报。"
    },
    itachi: {
      core: "你的人格底色是‘把责任放在情绪之前’。你对后果、承诺和长期安全感极其敏感，往往愿意先承担误解，再等待时间还原真相。你身上的温柔不喧哗，但会在关键时刻形成非常稳定的保护。",
      strengths: ["在高压情境下保持精准", "为重要的人承担长期责任", "看见表面选择背后的代价"],
      blindspot: "你容易把‘不让别人担心’当成最高优先级，久而久之，连亲近的人也只能通过猜测来理解你。独自承担并不总是最负责任的做法，共享信息也是保护。",
      companion: "适合你的关系需要耐心、诚实和能够承受深度的人。你要的不是热闹，而是有人愿意在你不解释的时候仍然尊重你，同时也温和地邀请你把真相说出来。",
      practice: "下一阶段的忍道：把一件你正在独自承担的事告诉一个可信任的人，只描述事实和感受，不急着替所有人安排结局。"
    },
    hinata: {
      core: "你的人格底色是‘温柔但不再后退’。你很敏锐地感受他人的情绪，因此不会轻易把自己放到中心；但当真正重要的事情发生时，你的价值观会比声音更坚定。你的勇气是慢慢长出来的，却非常耐久。",
      strengths: ["精准捕捉关系中的细微变化", "让别人感到安全而被尊重", "在关键关口稳定地向前一步"],
      blindspot: "你可能太快把机会让给更自信、更响亮的人，直到局面逼你站出来才想起自己的判断同样重要。体贴别人不等于自动缩小自己的位置。",
      companion: "适合你的关系要给出明确回应，也要真正欣赏你的成长，而不是把你的温柔当成理所当然。你可以被保护，也可以直接说出自己想要什么。",
      practice: "下一阶段的忍道：在一个不需要等到完美准备的场合，提前表达一次意见或需求；让勇气从‘最后关头’进入你的日常。"
    },
    gaara: {
      core: "你的人格底色是‘把防御转化成边界与责任’。你很早就知道世界并不总是温柔，因此不会轻易交出信任；但一旦认定某件事值得守护，你会比大多数人更稳定、更有耐力。",
      strengths: ["在混乱中守住底线", "把受过的伤转成判断力", "让团队感到有清晰的安全边界"],
      blindspot: "你的防御系统很强，有时连真正想帮助你的人也会被挡在门外。你不必等到完全确定、完全不受伤，才允许关系向前一步。",
      companion: "适合你的关系需要尊重你的边界，但不会被你的沉默劝退。你可以把‘我没事’换成更准确的说明，让别人知道如何靠近，而不是让他们反复试错。",
      practice: "下一阶段的忍道：主动向一个可靠的人开放一小块真实生活，不求对方解决，只练习让对方参与；安全感可以在共享中长出来。"
    },
    rocklee: {
      core: "你的人格底色是‘把重复做成奇迹’。你相信能力来自训练、承诺和日复一日的积累，所以不会因为起点普通就轻易放弃。你的热情不是空喊口号，而是能让身边人重新相信努力有意义。",
      strengths: ["用持续行动穿过低谷", "把团队情绪重新点燃", "把抽象目标拆成可完成的训练"],
      blindspot: "你很容易把休息理解成偷懒，把求助理解成不够强。长期坚持不是永远加码，而是知道什么时候恢复、调整和换一种方法。",
      companion: "适合你的关系要尊重你的热情，也能提醒你不必通过不断付出来换取认可。你值得被喜欢，不只是因为你努力、可靠、永远愿意站起来。",
      practice: "下一阶段的忍道：把训练计划加入‘恢复日’和‘庆祝日’，并且让一个伙伴知道你的真实进度；可持续的热血才是真正的力量。"
    },
    tsunade: {
      core: "你的人格底色是‘见过代价之后仍然选择救人’。你不容易被漂亮话打动，更关心方案能不能落地、承诺能不能兑现、受伤的人能不能被真正接住。你既有强硬的执行力，也有非常深的共情。",
      strengths: ["在关键时刻做出保护性决策", "把经验转成可复制的系统", "敢于拆掉已经失效的旧规则"],
      blindspot: "你太习惯做那个撑住全场的人，容易把控制感当作安全感。不是所有问题都需要你亲自收拾，允许别人承担后果，也是在培养真正的同伴。",
      companion: "适合你的关系要成熟、坦诚、能并肩面对现实。你不需要一个只享受你强大的人，而需要一个能听懂你疲惫、愿意和你共同分担的人。",
      practice: "下一阶段的忍道：把一个决策权交给团队或伴侣，只设清晰边界，不替对方走完整条路；领导力也包括让别人长出力量。"
    },
    jiraiya: {
      core: "你的人格底色是‘用故事理解世界，也把答案交给后来者’。你有强烈的好奇心和现场直觉，不喜欢被单一身份困住；但在看似玩世不恭的背后，你其实很在意一个人能否长成自己的样子。",
      strengths: ["在陌生环境里快速建立联系", "从失败与经验中提炼故事", "用幽默让沉重的事变得可面对"],
      blindspot: "你擅长用自由躲开告别、承诺和脆弱，好像只要保持潇洒就不会失去。可真正重要的人，往往需要的不是你的传奇，而是你清楚地说‘我在乎’。",
      companion: "适合你的关系要允许空间，也要愿意和你讨论真实的未来。你可以继续保持有趣，但别让玩笑替你完成所有情感表达。",
      practice: "下一阶段的忍道：把一段经验写下来、教给别人，或认真对一个重要的人说出感谢；留下痕迹，比不断出发更能延长你的影响力。"
    },
    orochimaru: {
      core: "你的人格底色是‘把未知拆成可以研究的问题’。你天生不满足于标准答案，喜欢追问机制、边界和可能性，也愿意为探索付出长期成本。你的稀缺能力是看见别人还没有命名的方向。",
      strengths: ["发现被忽略的可能性", "快速学习并重组复杂知识", "在不确定领域建立自己的方法论"],
      blindspot: "当好奇和野心同时加速时，你可能只看见‘能不能做到’，忘记追问‘应该不应该’以及‘谁会为此付出代价’。边界不是对创造力的限制，而是让成果值得被信任。",
      companion: "适合你的关系要聪明、坦诚、敢于指出问题，也要尊重彼此的独立性。你不需要被驯服，但需要愿意让别人拥有与你不同的价值排序。",
      practice: "下一阶段的忍道：为正在推进的一个目标写下三条不可越过的伦理边界，并邀请一个敢反驳你的人参与校验；高级探索必须经得起回看。"
    }
  };

  const reportExpansion = {
    naruto: {
      values: ["伙伴之间的真实感", "被看见的成长", "把不可能变成可能", "给别人第二次机会"],
      motivators: ["有人因你而不再孤单", "把承诺变成行动", "在逆风中赢得信任", "让团队重新有希望"],
      watchouts: ["过度承诺后独自硬扛", "情绪上头时先冲再想", "把求助误解成软弱"],
      microMoves: ["把你需要的帮助说得具体", "给伙伴真正的分工和空间", "重大决定前先留十秒观察局面"]
    },
    sasuke: {
      values: ["选择权", "能力的锋利度", "真实而不被操控的关系", "对真相的掌握"],
      motivators: ["证明自己不由过去定义", "夺回人生的主动权", "把复杂目标走到底", "让重要的人不再轻易失去"],
      watchouts: ["把孤独包装成专注", "只用结果表达在乎", "为了赢而切断可用的支持"],
      microMoves: ["告诉一个人你正在承受什么", "把长期目标拆成可被分享的阶段", "保留一个不以胜负衡量的兴趣"]
    },
    sakura: {
      values: ["专业与可靠", "真正解决问题", "被尊重的能力", "对重要之人的保护"],
      motivators: ["把混乱重新变得可控", "让自己成为有用的答案", "用实力换来安全感", "看见努力产生真实结果"],
      watchouts: ["把高标准变成自我惩罚", "凡事都想亲自纠正", "只允许自己在有产出时休息"],
      microMoves: ["把‘我来处理’改成‘我们拆开处理’", "给自己安排没有产出的时间", "接受一次不完美但及时的交付"]
    },
    kakashi: {
      values: ["清醒判断", "伙伴安全", "保留余地", "在复杂中维持秩序"],
      motivators: ["减少无谓的损失", "让每个人发挥所长", "把一次失败变成可复用的经验", "在关键节点托住全队"],
      watchouts: ["用玩笑藏住疲惫", "总做观察者而不说需求", "替所有人承担情绪后才崩溃"],
      microMoves: ["在一场对话里说出真实需求", "不要只给建议，也讲讲你的感受", "让别人负责一个你通常会接手的环节"]
    },
    shikamaru: {
      values: ["效率", "清晰的优先级", "可持续的生活", "对少数重要关系的忠诚"],
      motivators: ["避免无意义的损耗", "把复杂问题降维", "让重要的人少受一点伤害", "保留真实的选择余地"],
      watchouts: ["还没开始就算完所有成本", "用‘太麻烦’提前退出", "看得太多可能性而迟迟不选"],
      microMoves: ["用七十分版本先启动", "把一个决定设定明确截止时间", "主动争取一次你其实在乎的机会"]
    },
    itachi: {
      values: ["承诺", "长期安全", "克制", "不让无辜的人被牵连"],
      motivators: ["守住重要的人", "让局面不至于失控", "承担别人不愿承担的代价", "用时间证明自己的选择"],
      watchouts: ["把沉默当成保护", "把责任全部收回自己身上", "等别人猜中你的真实需要"],
      microMoves: ["共享一件你正在独自承担的事", "先说事实和感受，不急着安排结局", "把一部分责任明确交还给关系中的另一方"]
    },
    hinata: {
      values: ["温柔", "明确的善意", "一步一步的勇气", "彼此看见"],
      motivators: ["保护珍惜的人", "证明温和也有力量", "在关键时刻不再后退", "看见自己真实的成长"],
      watchouts: ["把机会让给更响亮的人", "等到最后关头才表达", "习惯先证明别人比自己更合适"],
      microMoves: ["在会议或群体里提前说一次意见", "直接说出一个想要的回应", "把一次小小的胜利记录下来而不是略过"]
    },
    gaara: {
      values: ["安全边界", "稳定责任", "被理解的孤独", "把伤害停止在自己这里"],
      motivators: ["不让别人重复自己的经历", "建立不会轻易崩塌的秩序", "用可靠换来信任", "让防御最终变成保护"],
      watchouts: ["把边界筑成隔离墙", "只提供保护却不分享感受", "等别人先证明绝对不会离开"],
      microMoves: ["主动开放一小块真实生活", "把‘我没事’换成更准确的说明", "让一个可靠的人参与解决而不是只接受结果"]
    },
    rocklee: {
      values: ["努力", "兑现承诺", "持续进步", "让热情感染别人"],
      motivators: ["证明起点不是终点", "把目标练成身体记忆", "在低谷里保持尊严", "让伙伴重新相信自己"],
      watchouts: ["把休息理解成偷懒", "把求助理解成不够强", "只会加码而不会换方法"],
      microMoves: ["把恢复日写进训练计划", "给进度设置庆祝节点", "让一个伙伴知道你的真实状态而不是只看结果"]
    },
    tsunade: {
      values: ["生命与责任", "实用主义", "改革", "把人放在结果之前"],
      motivators: ["让受伤的人真正被接住", "把经验变成制度", "在旧规则失效时重建秩序", "保护下一代少走弯路"],
      watchouts: ["用控制感抵抗不安", "把所有残局都揽到自己身上", "只允许别人接受你的保护而不分担责任"],
      microMoves: ["把一个决策权交给可靠的同伴", "明确边界后允许别人试错", "在疲惫时直接请求支持而不是提高音量"]
    },
    jiraiya: {
      values: ["自由", "经验传承", "真实连接", "对下一代的期待"],
      motivators: ["看见别人长成自己", "把失败提炼成故事", "在未知里保持好奇", "留下能继续影响别人的东西"],
      watchouts: ["用玩笑逃开告别", "用自由回避承诺", "把关心藏到最后才说"],
      microMoves: ["认真表达一次感谢", "把一段经验写下来或教给别人", "为一段重要关系讨论真实的未来"]
    },
    orochimaru: {
      values: ["未知", "自主探索", "能力边界", "对标准答案的怀疑"],
      motivators: ["发现别人尚未命名的可能", "延长选择与能力的边界", "用方法拆开复杂系统", "证明终点并不是固定的"],
      watchouts: ["只问能不能而忘了应不应该", "把人当成实验变量", "目标加速后失去伦理刹车"],
      microMoves: ["为目标写下三条不可越过的边界", "邀请敢反驳你的人参与校验", "每次突破后复盘谁承担了代价"]
    }
  };

  Object.entries(reportExpansion).forEach(([id, extra]) => {
    Object.assign(reportExtras[id], extra);
  });

  Object.entries(reportExtras).forEach(([id, report]) => {
    characters[id].report = report;
  });

  return { dimensions, questions, characters };
})();
