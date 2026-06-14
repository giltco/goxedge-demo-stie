/**
 * GoxEDGE model — structural data for coded replica.
 * Matches official full model overview diagram.
 */

var GOXEDGE_MODEL = {
  name: 'GoxEDGE 全球拓展战略模型',
  description: '从起点判断、路径设计到组织承接与长期经营能力',

  referenceImage: '../assets/img/figures/fig-3-5-goxedge-model-overview.png',
  showReferenceImage: false,

  layerLabels: [
    { id: 'mechanism', label: '战略推进机制层', gradient: 'mechanism' },
    { id: 'path', label: '战略路径层', gradient: 'path' },
    { id: 'capability', label: '战略能力支撑层', gradient: 'capability' },
    { id: 'judgment', label: '战略判断层', gradient: 'judgment' }
  ],

  mechanism: {
    footnote: '推进机制（认知—行动—反馈）贯穿六阶段，形成持续迭代闭环',
    steps: [
      { id: 'cognition', title: '认知', subtitle: '看清环境与边界', summary: '形成对全球环境、市场机会与自身能力的共同判断。' },
      { id: 'action', title: '行动', subtitle: '转化为市场与组织动作', summary: '把判断转化为可执行的路径、任务与组织协同。' },
      { id: 'feedback', title: '反馈', subtitle: '校准判断与下一轮行动', summary: '通过复盘、门禁与迭代机制校准下一步动作。' }
    ]
  },

  path: {
    iterationLabel: '阶段复盘与持续迭代',
    stages: [
      {
        id: 'explore', num: 1, title: '探索', en: 'Explore', color: '#075aa8',
        items: ['宏观环境扫描', '法规与合规评估', '技术演进评估', '市场调研设计', '客户洞察建立', '竞争格局分析', '利益相关者映射', '组织能力诊断'],
        summary: '看清目标市场是否具备进入与后续定位的基础条件。'
      },
      {
        id: 'position', num: 2, title: '定位', en: 'Position', color: '#2f7d32',
        items: ['细分市场识别', '目标市场选择', '文化敏感性与兼容审查', '市场竞争态势分析', '价值主张设计与验证', '差异化定位确认', '品牌本地化路径', '市场进入策略与节奏设计'],
        summary: '收拢为优先服务对象、价值主张、差异化位置与进入节奏。'
      },
      {
        id: 'execute', num: 3, title: '执行', en: 'Execute', color: '#f04a23',
        items: ['合规启动准备', '渠道与伙伴体系', '产品与服务本地化', '市场承接与商业转化机制', '本地运营启动', '本地传播路径', '数据指标体系', '风险响应机制'],
        summary: '通过合规、渠道、本地化与商业闭环跑通首轮落地链。'
      },
      {
        id: 'empower', num: 4, title: '赋能', en: 'Empower', color: '#4b2ca3',
        items: ['组织学习机制', '跨文化沟通机制', '企业文化内在链接', '全球人才体系', '本地团队成长路径', '技术平台与协同支持', '跨市场协同与资源联动', '领导力与全球管理能力'],
        summary: '把执行成果转化为组织承接能力。'
      },
      {
        id: 'optimize', num: 5, title: '优化', en: 'Optimize', color: '#1288c7',
        items: ['从试点到复制', '绩效评估与反馈闭环', '流程标准化与经验复制', '创新迭代与成本效率优化', '用户参与与共创', '规模化增长路径'],
        summary: '把试点经验转化为可复制、可扩展的增长路径。'
      },
      {
        id: 'sustain', num: 6, title: '可持续', en: 'Sustain', color: '#1f6b2c',
        items: ['责任治理机制', '本地价值网络与合作生态', '人才发展与接续', '可持续审计与治理闭环', '可持续创新机制', '韧性、风险与退出机制'],
        summary: '建立责任治理、本地价值网络与可持续经营结构。'
      }
    ]
  },

  capabilities: {
    title: 'EDGE 四大能力',
    subtitle: '贯穿六阶段的能力支撑',
    cells: [
      { id: 'expertise', title: '专业性', en: 'Expertise', description: '构建专业判断与方法体系，提供前瞻洞察与高质量解决方案。' },
      { id: 'diversification', title: '多元化', en: 'Diversification', description: '整合多元资源与生态网络，增强全球适配与协同能力。' },
      { id: 'growth', title: '增长力', en: 'Growth', description: '驱动增长机会识别与价值创造，实现规模化与可持续增长。' },
      { id: 'empowerment', title: '赋能力', en: 'Empowerment', description: '赋能组织与人才，构建学习型组织，释放长期内生动力。' }
    ]
  },

  judgment: {
    title: '战略判断',
    subtitle: '战略准备度、重点判断与路径设计的首要底座',
    items: [
      { id: 'env', title: '环境与趋势判断', summary: '判断全球环境、行业趋势与市场窗口是否支持当前拓展节奏。' },
      { id: 'intent', title: '战略意图与目标', summary: '明确全球拓展的战略意图、边界与阶段性目标。' },
      { id: 'anchor', title: '战略锚点与起点判断', summary: '确定从哪里启动、以什么锚点组织后续路径。' },
      { id: 'resource', title: '资源与能力评估', summary: '评估组织、产品、团队与资源是否支撑所选路径。' },
      { id: 'priority', title: '路径优先级设定', summary: '在多条可能路径中确定优先顺序与推进节奏。' },
      { id: 'risk', title: '风险识别与应对', summary: '识别关键风险边界，并建立应对与复核机制。' }
    ]
  },

  note: '模型说明：战略判断是起点，EDGE 四大能力提供贯穿支撑，六阶段路径组织推进，推进机制（认知—行动—反馈）持续校准，共同驱动企业全球拓展能力沉淀与长期成功。',

  layersSummary: [
    { title: '战略推进机制层', text: '认知—行动—反馈机制贯穿全过程，形成持续迭代闭环。' },
    { title: '战略路径层', text: '以探索、定位、执行、赋能、优化、可持续六阶段组织推进。' },
    { title: '战略能力支撑层', text: 'EDGE 四大能力贯穿六阶段，支撑路径走实、走稳、走远。' },
    { title: '战略判断层', text: '回答能否启动、从哪里启动以及路径如何设计。' }
  ]
};
