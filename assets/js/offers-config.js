/**

 * Purchase and acquisition catalog — single editable source.

 *

 * availabilityStatus: 'available' | 'upcoming' | 'book-launch-pending' | 'reader-exclusive' | 'workshop' | 'planned'

 * accessType: 'purchase-channel' | 'ebook-channel' | 'minvista' | 'purchase-required' | 'reader-exclusive' | 'workshop' | 'merchandise' | 'unavailable'

 * link: relative path from /purchase/ (empty = no clickable action)

 * enabled: omit or true to show; false to hide item or group

 *

 * Do not add fake purchase URLs, payment flows, or download links.

 */



var OFFERS_CONFIG = {

  pageTitle: '购买与获取',

  summaryCards: [

    {

      title: '图书购买',

      description: '纸质书与电子书入口将在正式上架后更新。'

    },

    {

      title: '读者专享资料',

      description: '自测表、判断模板、行动计划等资料将面向购书读者逐步开放。'

    },

    {

      title: '入门资料与更新',

      description: 'Starter eBook 等轻量资料将通过 Minvista 获取更新或领取指引。'

    },

    {

      title: '工作坊配套',

      description: 'Workshop Canvas 等材料用于企业读书会、管理层研讨和工作坊场景。'

    }

  ],

  groups: [

    {

      id: 'book-purchase',

      title: '图书购买',

      description: '图书正式上架后，将在这里更新纸质书和电子书购买入口。',

      items: [

        {

          id: 'jd-paper',

          title: '纸质书｜京东',

          category: '图书',

          description: '',

          availabilityStatus: 'book-launch-pending',

          accessType: 'purchase-channel',

          actionLabel: '即将更新',

          priceLabel: '以平台上架信息为准',

          link: '',

          note: '正式上架后更新京东购买入口。'

        },

        {

          id: 'dangdang-paper',

          title: '纸质书｜当当',

          category: '图书',

          description: '',

          availabilityStatus: 'book-launch-pending',

          accessType: 'purchase-channel',

          actionLabel: '即将更新',

          priceLabel: '以平台上架信息为准',

          link: '',

          note: '正式上架后更新当当购买入口。'

        },

        {

          id: 'ebook',

          title: '电子书',

          category: '电子书',

          description: '',

          availabilityStatus: 'book-launch-pending',

          accessType: 'ebook-channel',

          actionLabel: '即将更新',

          priceLabel: '以平台上架信息为准',

          link: '',

          note: '正式上线后更新电子书入口。'

        },

        {

          id: 'wechat-read',

          title: '微信读书',

          category: '电子书',

          description: '',

          availabilityStatus: 'book-launch-pending',

          accessType: 'ebook-channel',

          actionLabel: '即将更新',

          priceLabel: '以平台上架信息为准',

          link: '',

          note: '如上线微信读书，将在此更新入口。'

        }

      ]

    },

    {

      id: 'reader-resources',

      title: '读者专享资料',

      description: '面向购书读者或指定读者开放的资料，将根据出版进度逐步更新获取方式。',

      items: [

        {

          id: 'self-assessment',

          title: '企业全球拓展自测表',

          category: '自测',

          description: '用于初步判断企业在战略准备、市场进入、产品适配、组织承接和本地执行方面的准备度。',

          availabilityStatus: 'upcoming',

          accessType: 'reader-exclusive',

          actionLabel: '读者专享｜即将开放',

          priceLabel: '购书读者 / 指定读者',

          link: '',

          note: '开放方式将随图书正式发行后更新。'

        },

        {

          id: 'market-templates',

          title: '目标市场判断模板',

          category: '模板',

          description: '用于梳理目标市场、客户需求、竞争生态、规则边界和进入优先级。',

          availabilityStatus: 'upcoming',

          accessType: 'reader-exclusive',

          actionLabel: '读者专享｜即将开放',

          priceLabel: '购书读者 / 指定读者',

          link: '',

          note: '开放方式将随图书正式发行后更新。'

        },

        {

          id: 'action-plan',

          title: '行动计划模板',

          category: '模板',

          description: '用于把阶段判断转化为 30 / 60 / 90 天行动安排。',

          availabilityStatus: 'upcoming',

          accessType: 'reader-exclusive',

          actionLabel: '读者专享｜即将开放',

          priceLabel: '购书读者 / 指定读者',

          link: '',

          note: '开放方式将随图书正式发行后更新。'

        },

        {

          id: 'market-entry-checklist',

          title: 'Market Entry Checklist',

          category: '检查清单',

          description: '用于进入目标市场前，对环境、需求、竞争、规则、资源和风险进行初步核对。',

          availabilityStatus: 'upcoming',

          accessType: 'reader-exclusive',

          actionLabel: '读者专享｜即将开放',

          priceLabel: '购书读者 / 指定读者',

          link: '',

          note: '用于梳理目标市场进入前需要确认的关键判断、资源边界和风险事项。'

        }

      ]

    },

    {

      id: 'lead-magnet',

      title: '入门资料与更新',

      description: '帮助读者快速理解 GoxEDGE 模型与基本使用方式的轻量资料，将通过 Minvista 获取更新或领取指引。',

      items: [

        {

          id: 'starter-ebook',

          title: 'GoxEDGE Starter eBook',

          category: '入门资料',

          description: '用于帮助初次接触 GoxEDGE 的读者快速理解模型结构、六阶段路径和基本使用方式。',

          availabilityStatus: 'upcoming',

          accessType: 'minvista',

          actionLabel: '通过 Minvista 获取',

          priceLabel: '免费 / 领取方式待更新',

          link: '../updates/index.html',

          note: '用于快速理解 GoxEDGE 全球拓展战略模型的简版说明资料，适合首次接触本书方法框架的读者。'

        }

      ]

    },

    {

      id: 'purchase-required',

      title: '可购买工具资料',

      description: 'Strategy Notebook 等结构化工具材料将根据后续产品化安排逐步开放。',

      items: [

        {

          id: 'strategy-notebook',

          title: 'Strategy Notebook',

          category: '工作手册',

          description: '用于围绕战略锚点、起点校准、路径设计和阶段复盘开展结构化记录。',

          availabilityStatus: 'upcoming',

          accessType: 'purchase-required',

          actionLabel: '需购买后获取',

          priceLabel: '定价待定',

          link: '',

          note: '用于记录企业全球拓展中的战略判断、市场假设、路径选择和复盘问题。'

        }

      ]

    },

    {

      id: 'workshop',

      title: '工作坊配套',

      description: '用于企业读书会、管理层研讨和工作坊场景的配套材料。',

      items: [

        {

          id: 'workshop-canvas',

          title: 'Workshop Canvas',

          category: '工作坊画布',

          description: '用于企业内部读书会、管理层研讨和全球拓展路径共识讨论。',

          availabilityStatus: 'workshop',

          accessType: 'workshop',

          actionLabel: '工作坊配套',

          priceLabel: '工作坊场景使用',

          link: '',

          note: '用于企业内部读书会、管理层研讨和全球拓展路径共识讨论，不作为普通公开下载材料。'

        }

      ]

    },

    {

      id: 'merchandise',

      title: '周边与扩展产品',

      description: '未来可能开放的实体或数字周边。',

      enabled: false,

      items: [

        {

          id: 'model-card',

          title: 'GoxEDGE 桌面模型卡',

          category: '周边',

          description: '',

          availabilityStatus: 'planned',

          accessType: 'merchandise',

          actionLabel: '规划中',

          priceLabel: '定价待定',

          link: '',

          note: '',

          enabled: false

        },

        {

          id: 'reading-notebook',

          title: 'GoxEDGE 阅读笔记本',

          category: '周边',

          description: '',

          availabilityStatus: 'planned',

          accessType: 'merchandise',

          actionLabel: '规划中',

          priceLabel: '定价待定',

          link: '',

          note: '',

          enabled: false

        },

        {

          id: 'workshop-card-set',

          title: 'GoxEDGE Workshop Card Set',

          category: '周边',

          description: '',

          availabilityStatus: 'planned',

          accessType: 'merchandise',

          actionLabel: '规划中',

          priceLabel: '定价待定',

          link: '',

          note: '',

          enabled: false

        }

      ]

    }

  ]

};


