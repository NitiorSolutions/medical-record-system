'use strict';

module.exports = function(Model, options) {
  Model.defineProperty('created', {
    type: Date,
    defaultFn: 'now',
  });
  Model.defineProperty('modified', {
    type: Date,
    defaultFn: 'now',
  });

  Model.observe('before save', function event(ctx, next) {
    if ((ctx.options && ctx.options.skipTimestamp) ||   // explicitly skip modified
      ctx.isNewInstance) {                              // we can just use defaultFn
      return next();
    }
    if (ctx.instance) {
      ctx.instance.modified = new Date();
    } else {
      ctx.data.modified = new Date();
    }
    next();
  });
};
