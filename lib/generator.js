'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  const perPage = config.category_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const orderBy = config.category_generator.order_by || '-date';
  const exclude = orderBy[0] == '-' ? orderBy.substring(1) : '-' + orderBy;

  return locals.categories.reduce((result, category) => {
    const page = locals.pages.data.find((item, index) => {
      return item.title == category.name && item.path == category.path + 'index.html';
    })
    if (!category.length) {
      if (page && page.content && page.content.length > 0) {
        return result.concat([
          {
            path: category.path,
            layout: ['category', 'archive', 'index'],
            data: {
              title: page.title,
              date: page.date,
              type: page.type,
              layout: page.layout,
              base: category.path,
              total: 1,
              current: 1,
              current_url: category.path,
              posts: [],
              prev: 0,
              prev_link: '',
              next: 0,
              next_link: '',
              category: category.name,
              content: page.content
            }
          }
        ])
      }
      return result;
    }

    var order;
    var orderInfo;
    if (config.category_generator.order_exclude 
      && config.category_generator.order_exclude.indexOf(category.name) != -1) {
      order = exclude;
    } else if (config.category_generator.order_oneself 
      && (orderInfo = config.category_generator.order_oneself.find((item, index) => {
        return item.category.indexOf(category.name) != -1;
      }))) {
      order = orderInfo.order_by;
    } else {
      order = orderBy;
    }

    const posts = category.posts.sort(order);
    var _data = {
      category: category.name,
    }
    if (page && page.content && page.content.length > 0) {
      _data.title = page.title;
      _data.date = page.date;
      _data.type = page.type;
      _data.layout = page.layout;
      _data.content = page.content;
    }
    const data = pagination(category.path, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: paginationDir + '/%d/',
      data: _data
    });

    return result.concat(data);
  }, []);
};
