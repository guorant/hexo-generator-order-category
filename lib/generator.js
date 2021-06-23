'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  const perPage = config.category_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const orderBy = config.category_generator.order_by || '-date';
  const exclude = orderBy[0] == '-' ? orderBy.substring(1) : '-' + orderBy;

  return locals.categories.reduce((result, category) => {
    if (!category.length) return result;

    const posts = category.posts.sort(config.category_generator.order_exclude 
      && config.category_generator.order_exclude.indexOf(category.name) != -1 ? exclude : orderBy);
    const data = pagination(category.path, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: paginationDir + '/%d/',
      data: {
        category: category.name
      }
    });

    return result.concat(data);
  }, []);
};
