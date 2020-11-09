/**
 * This file contains Launch Darkly configurations which are SDK key name, feature key, targeted user
 * information.
 *
 * For more information please visit: https://docs.launchdarkly.com/v1.0/docs/js-sdk-reference
 */

/**
 * SDK key name which is used for retriving the launch darkly client id from config.json,
 * which gets generated while starting up the app from environment variables.
 * Keep this field in config.json as empty string, because while starting of the server, it will get replaced
 * with proper launch darkly environment specific "Client ID", which is being passed as environment variable
 * to the server
 */
export const launchDarklyEnvKeyName = "LAUNCHDARKLYCLIENTID";
/**
 * User details for adding a user to launch darkly system, which can be viewed in "Users" section
 * of launch darkly dashboard. This perticular user will get added to launch darkly environment, of which
 * client id is consumed.
 * Please note that user keys, including e-mail addresses, are case sensitive.
 */
export const launchDarklyUser = {
  firstName: "Bob",
  lastName: "Loblaw",
  key: "bob@example.com",
  custom: {
    groups: "beta_testers"
  }
};
/**
 * Feature toggle key that is retrived from launch darkly environment to enable/disable a perticular feature
 * e.g. Delete Todos Enable / Disable Feature
 */
export const launchDarklyFeatureToggleKey = {
  DELETE_FEATURE_KEY: "dev-sent2-8060-deletetodolaunchdarklyintegrationreact"
};
