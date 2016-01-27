/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  /**
   * Auth
   */
  'get /api/login': 'AuthController.login',
  'get /api/logout': 'AuthController.logout',
  'get /api/register': 'AuthController.register',

  'post /api/auth/local': 'AuthController.callback',
  'post /api/auth/local/:action': 'AuthController.callback',

  'get /api/auth/:provider': 'AuthController.provider',
  'get /api/auth/:provider/callback': 'AuthController.callback',
  'get /api/auth/:provider/:action': 'AuthController.callback',

  /**
   * Users
   */

  'get /api/users/current': 'UserController.findCurrent',
  'put /api/users/current': 'UserController.updateCurrent',

  /**
   * Docs
   */
  'get /api/docs/': 'DocumentController.index',
  'get /api/docs/:id': 'DocumentController.find',
  'post /api/docs/': 'DocumentController.create',
  'put /api/docs/:id': 'DocumentController.update',
  'delete /api/docs/:id': 'DocumentController.destroy',

  // Context for document
  'get /api/docs/:id/context': 'DocumentController.findContext',

  /**
   * Doc Types
   */
  'get /api/doc-types/': 'DocumentTypeController.index',
  'get /api/doc-types/:id': 'DocumentTypeController.find',
  'post /api/doc-types/': 'DocumentTypeController.create',
  'put /api/doc-types/:id': 'DocumentTypeController.update',
  'delete /api/doc-types/:id': 'DocumentTypeController.destroy',

  /**
   * Catchall
   */
  'get /*': {
    skipAssets: true,
    view: 'homepage'
  }
};
