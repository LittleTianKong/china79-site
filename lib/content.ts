export type Article = {
  slug: string;

  section: string;
  sectionZh: string;

  title: string;
  titleZh: string;

  dek: string;
  dekZh: string;

  date: string;
  dateZh: string;

  readTime: string;
  readTimeZh: string;

  author: string;
  authorZh: string;

  body: string[];
  bodyZh: string[];
};

export const articles: Article[] = [
  {
    slug: "competition-and-cooperation",

    section: "U.S.-China Relations",
    sectionZh: "美中关系",

    title: "Can Competition and Cooperation Coexist in U.S.-China Relations?",
    titleZh: "竞争与合作能否在美中关系中共存？",

    dek:
      "Strategic competition now defines much of Washington's approach to China. That does not eliminate the value of identifying areas where cooperation remains possible.",

    dekZh:
      "战略竞争如今在很大程度上塑造了华盛顿的对华政策，但这并不意味着寻找双方仍可合作的领域失去了价值。",

    date: "October 2026",
    dateZh: "2026年10月",

    readTime: "6 min read",
    readTimeZh: "阅读约6分钟",

    author: "China79",
    authorZh: "China79",

    body: [
      "U.S.-China relations are increasingly described through the language of strategic competition. That framework captures genuine disagreements over security, technology, trade, and regional influence, but it can also narrow the range of policy options considered by both sides.",

      "China79 approaches the relationship from a simple premise: competition and cooperation can exist at the same time. Understanding where interests diverge is essential, but so is identifying areas where dialogue can reduce misunderstanding, lower costs, or advance shared interests.",

      "This launch essay is a placeholder for a fully sourced China79 analysis. Replace it with your own final article before publication."
    ],

    bodyZh: [
      "美中关系越来越多地被置于战略竞争的框架下讨论。这一框架确实反映了双方在安全、科技、贸易和地区影响力等问题上的真实分歧，但也可能限制双方所考虑的政策选择范围。",

      "China79 对美中关系的分析基于一个简单前提：竞争与合作可以同时存在。理解双方利益存在分歧的领域十分重要，同样重要的是寻找能够通过对话减少误解、降低成本或推进共同利益的领域。",

      "本文目前为 China79 网站设计阶段使用的占位内容。正式发布前应替换为完整且具有可靠来源支持的分析文章。"
    ]
  },

  {
    slug: "video-games-soft-power",

    section: "Soft Power",
    sectionZh: "软实力",

    title:
      "China's Video Game Industry Is Becoming a Source of Soft Power",

    titleZh:
      "中国电子游戏产业正在成为软实力的新来源",

    dek:
      "Commercial success can carry political meaning when it signals technological capacity, cultural reach, and confidence in a country's development model.",

    dekZh:
      "当商业成功体现一个国家的技术能力、文化影响力以及对自身发展模式的信心时，它也可能具有更广泛的政治意义。",

    date: "October 2026",
    dateZh: "2026年10月",

    readTime: "7 min read",
    readTimeZh: "阅读约7分钟",

    author: "China79",
    authorZh: "China79",

    body: [
      "China's video game industry offers a useful lens for examining the relationship between commercial success, national prestige, and soft power.",

      "A polished final version could draw from your undergraduate research while updating the evidence and clearly distinguishing commercial achievement from direct state influence.",

      "This text is intentionally marked as placeholder content so the site can be designed around real article structures without presenting unfinished analysis as published work."
    ],

    bodyZh: [
      "中国电子游戏产业为研究商业成功、国家声望与软实力之间的关系提供了一个有价值的视角。",

      "正式版本可以在既有研究基础上更新相关证据，并明确区分商业成就与政府直接影响之间的差异。",

      "本文目前被明确标记为占位内容，以便网站能够按照真实文章结构进行设计，同时避免将尚未完成的分析呈现为正式发表的研究成果。"
    ]
  },

  {
    slug: "mandarin-pipeline",

    section: "Education & Policy",
    sectionZh: "教育与政策",

    title:
      "Why America's Mandarin Pipeline Matters for U.S.-China Policy",

    titleZh:
      "为什么美国的普通话人才培养体系关系到美中政策",

    dek:
      "Limited access to sustained Mandarin education can narrow the future pool of Americans capable of working directly with Chinese-language sources and institutions.",

    dekZh:
      "持续接受普通话教育的机会有限，可能缩小未来能够直接使用中文资料并与中国机构开展工作的美国人才群体。",

    date: "October 2026",
    dateZh: "2026年10月",

    readTime: "5 min read",
    readTimeZh: "阅读约5分钟",

    author: "China79",
    authorZh: "China79",

    body: [
      "Language capacity is infrastructure for foreign policy. The ability to read, interpret, and engage directly with Chinese-language material affects research, diplomacy, business, journalism, and public understanding.",

      "A China79 policy brief could turn this issue into a concrete congressional outreach project by pairing a concise diagnosis with practical recommendations for expanding long-term language access.",

      "This placeholder should be replaced with a fully sourced brief before the site is made public."
    ],

    bodyZh: [
      "语言能力是外交政策基础设施的一部分。直接阅读、理解和使用中文资料的能力，会影响研究、外交、商业、新闻以及公众对中国的理解。",

      "China79 可以通过政策简报将这一问题转化为具体的国会政策交流项目，在明确分析问题的同时，提出扩大长期语言教育机会的可行建议。",

      "网站正式公开前，应以具有完整资料来源支持的政策简报替换这段占位内容。"
    ]
  }
];

export type PolicyItem = {
  type: string;
  typeZh: string;

  title: string;
  titleZh: string;

  summary: string;
  summaryZh: string;

  status: string;
  statusZh: string;
};

export const policyItems: PolicyItem[] = [
  {
    type: "Policy Brief",
    typeZh: "政策简报",

    title:
      "Expanding Mandarin Education as an Investment in American China Expertise",

    titleZh:
      "扩大普通话教育：投资美国的中国专业能力",

    summary:
      "A forthcoming brief on strengthening the U.S. pipeline for advanced Mandarin proficiency and China expertise.",

    summaryZh:
      "即将发布的一份政策简报，探讨如何加强美国高级普通话人才和中国问题专业人才的培养体系。",

    status: "In development",
    statusZh: "编写中"
  }
];
