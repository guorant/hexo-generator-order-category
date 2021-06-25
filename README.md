# hexo-generator-order-category

[![Build Status](https://travis-ci.org/guorant/hexo-generator-order-category.svg?branch=master)](https://travis-ci.org/guorant/hexo-generator-order-category)
[![NPM version](https://badge.fury.io/js/hexo-generator-order-category.svg)](https://www.npmjs.com/package/hexo-generator-order-category)
[![Coverage Status](https://img.shields.io/coveralls/guorant/hexo-generator-order-category.svg)](https://coveralls.io/r/guorant/hexo-generator-order-category?branch=master)

Category generator for [Hexo] with one's own order.

## Installation

``` bash
$ npm install hexo-generator-order-category --save
```

## Options

``` yaml
category_generator:
  per_page: 10
  order_by: -date
  order_exclude:
  - Markdown
  order_oneself:
  - order_by: title
    category:
    - '老子章释|大爱弗居,自由民主'
```

- **per_page**: Posts displayed per page. (0 = disable pagination)
- **order_by**: Posts order. (Order by date descending by default)
- **order_exclude**: Categorys' name list with reverse order.
- **order_oneself**: Categorys' list with oneself's own order.

## License

MIT

[Hexo]: http://hexo.io/
