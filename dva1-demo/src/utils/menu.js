module.exports = [
  {
    key: 'tracker',
    name: 'Tracker Management',
    icon: 'feiji',
  }, {
    key: 'fence',
    name: 'Geo-Fencing',
    icon: 'diliweilan1',
    child: [
      {
        key: 'list',
        name: 'Fence Setting',
        icon: 'list',
      },
      {
        key: 'step',
        name: 'Add Fence',
        icon: 'tianjia',
      },
    ],
  }, {
    key: 'account',
    name: 'Personal Center',
    icon: '200423',
  }, {
    key: 'user',
    name: 'Account Management',
    icon: 'kehu',
  }, {
    key: 'notify',
    name: 'Notification Settings',
    icon: 'tongzhi',
  }, {
    key: 'alarm',
    name: 'Alarm message',
    icon: 'unie601',
  }, {
    key: 'stay',
    name: 'Staying Details',
    icon: 'tingche',
  },
  // { key: 'ui',
  //   name: '停留详情',
  //   icon: 'tingliuzongshijian',
  //   clickable: false,
  //   child: [
  //     {
  //       key: 'ico',
  //       name: '水位',
  //     },
  //   ],
  // },
]
