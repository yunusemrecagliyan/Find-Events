'use strict';

/**
 * sear service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sear.sear');
