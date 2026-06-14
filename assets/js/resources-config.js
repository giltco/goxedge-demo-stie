/**

 * 《出海战略》companion resources catalog — single editable source.

 *

 * availabilityStatus: 'book-linked' | 'upcoming' | 'workshop' | 'paid'

 * accessType: 'public' | 'minvista' | 'reader-exclusive' | 'purchase-required' | 'workshop' | 'unavailable'

 * link: relative path from /resources/ (empty = no direct file link)

 * updatedAt: display string when set; omit or leave empty to hide

 *

 * Do not add fake download URLs or purchase flows.

 */



var RESOURCES_CONFIG = {

  pageTitle: '《出海战略》配套资源',

  homeItemIds: [
    'book-charts',
    'appendix-a',
    'appendix-b',
    'appendix-c',
    'self-assessment',
    'market-templates'
  ],

  items: [

    {

      id: 'book-charts',

      title: '书中关键图表',

      category: '图表',

      description: '用于快速回顾书中的核心框架、阶段关系和判断逻辑。',

      availabilityStatus: 'book-linked',

      accessType: 'unavailable',

      actionLabel: '随书更新',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'appendix-a',

      title: '附录 A：GoxEDGE 方法应用说明',

      category: '附录',

      description: '用于帮助读者理解如何把 GoxEDGE 用于诊断、研讨、研究和复盘。',

      availabilityStatus: 'book-linked',

      accessType: 'unavailable',

      actionLabel: '随书更新',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'appendix-b',

      title: '附录 B：主要图表索引',

      category: '附录',

      description: '用于快速定位书中核心图表与模型结构。',

      availabilityStatus: 'book-linked',

      accessType: 'unavailable',

      actionLabel: '随书更新',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'appendix-c',

      title: '附录 C：核心判断原则索引',

      category: '附录',

      description: '用于回顾书中关键判断原则，并支持内部讨论与复盘。',

      availabilityStatus: 'book-linked',

      accessType: 'unavailable',

      actionLabel: '随书更新',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'appendix-d',

      title: '附录 D：参考资料与延伸阅读',

      category: '附录',

      description: '用于进一步阅读全球化、国际商务、组织能力与企业出海相关资料。',

      availabilityStatus: 'book-linked',

      accessType: 'unavailable',

      actionLabel: '随书更新',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'self-assessment',

      title: '企业全球拓展自测表',

      category: '自测',

      description: '用于初步判断企业在战略准备、市场进入、产品适配、组织承接和本地执行方面的准备度。',

      availabilityStatus: 'upcoming',

      accessType: 'reader-exclusive',

      actionLabel: '读者专享｜即将开放',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'market-templates',

      title: '目标市场判断模板',

      category: '模板',

      description: '用于梳理目标市场、客户需求、竞争生态、规则边界和进入优先级。',

      availabilityStatus: 'upcoming',

      accessType: 'reader-exclusive',

      actionLabel: '读者专享｜即将开放',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'action-plan',

      title: '行动计划模板',

      category: '模板',

      description: '用于把阶段判断转化为 30 / 60 / 90 天行动安排。',

      availabilityStatus: 'upcoming',

      accessType: 'reader-exclusive',

      actionLabel: '读者专享｜即将开放',

      link: '',

      note: '',

      updatedAt: ''

    },

    {

      id: 'starter-ebook',

      title: 'GoxEDGE Starter eBook',

      category: '入门资料',

      description: '用于快速理解 GoxEDGE 全球拓展战略模型的简版说明资料，适合首次接触本书方法框架的读者。',

      availabilityStatus: 'upcoming',

      accessType: 'minvista',

      actionLabel: '通过 Minvista 获取',

      link: '',

      note: '正式开放前，可通过 Minvista 关注后续更新。',

      updatedAt: ''

    },

    {

      id: 'strategy-notebook',

      title: 'Strategy Notebook',

      category: '工作手册',

      description: '用于记录企业全球拓展中的战略判断、市场假设、路径选择和复盘问题。',

      availabilityStatus: 'upcoming',

      accessType: 'purchase-required',

      actionLabel: '需购买后获取',

      link: '',

      note: '获取方式将随图书正式发行后更新。',

      updatedAt: ''

    },

    {

      id: 'workshop-canvas',

      title: 'Workshop Canvas',

      category: '工作坊画布',

      description: '用于企业内部读书会、管理层研讨和全球拓展路径共识讨论。',

      availabilityStatus: 'workshop',

      accessType: 'workshop',

      actionLabel: '工作坊配套',

      link: '',

      note: '适用于企业读书会、管理层研讨或工作坊场景，不作为普通公开下载材料。',

      updatedAt: ''

    },

    {

      id: 'market-entry-checklist',

      title: 'Market Entry Checklist',

      category: '检查清单',

      description: '用于梳理目标市场进入前需要确认的关键判断、资源边界和风险事项。',

      availabilityStatus: 'upcoming',

      accessType: 'reader-exclusive',

      actionLabel: '读者专享｜即将开放',

      link: '',

      note: '获取方式将随图书正式发行后更新。',

      updatedAt: ''

    }

  ]

};


