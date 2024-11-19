export default {
  pages: [
    'pages/index/index',
    'pages/product/index',
    'pages/myproducts/index',
    'pages/login/index',
    'pages/mine/index',
    'pages/group/index',
    'pages/upload/index',
  ],
  "subPackages": [
    {
      "root": "module",
      "pages": [
        "tips/pages/index",
        "cat/pages/index",
        "shareGroups/pages/index",
        "welfare/index",
        "search/index",
        
      ],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
}
