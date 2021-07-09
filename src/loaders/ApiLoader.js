const Loader = require("./base");
const FileUtils = require("../utils/FileUtils");
const APIWrapper = require("../apis/api");
module.exports = class APILoader extends Loader {
  constructor(client) {
    super(
      {
        preLoad: true,
      },
      client
    );
    this.apis = {};
  }

  async load() {
    try {
      await this.initializeAPIs();
      this.client.apis = this.apis;
      return true;
    } catch (e) {
      this.client.log.error('initialise apis', e)
    }
    return false;
  }

  /**
   * Initializes all API Wrappers.
   * @param {string} dirPath - Path to the apis directory
   */
  initializeAPIs(dirPath = "src/apis") {
    let success = 0;
    let failed = 0;
    return FileUtils.requireDirectory(
      dirPath,
      (NewAPI) => {
        if (Object.getPrototypeOf(NewAPI) !== APIWrapper) return;
        this.addAPI(new NewAPI())
          .then((s) => (s ? success++ : failed++))
          .catch((e) => {
            this.client.log.error('adding apis', e);
            failed++;
          });
      },
    ).then(() => {
      if (failed)
        this.client.log.info(
          "apiLoader",
          `${success} API wrappers loaded, ${failed} failed.`
        );
      else
        this.log(
          "ApiLoader",
          `All ${success} API wrappers loaded without errors.`
        );
    });
  }

  /**
   * Adds a new API Wrapper to the Client.
   * @param {APIWrapper} api - API Wrapper to be added
   */
  async addAPI(api) {
    if (!(api instanceof APIWrapper)) {
      this.client.log.error(
        "apiLoader",
        `${api.name} failed to load - Not an APIWrapper`
      );
      return false;
    }

    if (api.canLoad() !== true) {
      this.client.log.error(
        "apiLoader",
        `${api.name} failed to load - ${
          api.canLoad() || "canLoad function did not return true."
        }`
      );
      return false;
    }

    if (
      !api.envVars.every((variable) => {
        if (!process.env[variable])
          this.client.log.error(
            "apiLoader",
            `${api.name} failed to load - Required environment variable "${variable}" is not set.`
          );
        return !!process.env[variable];
      })
    )
      return false;

    this.apis[api.name] = await api.load();
    return true;
  }
};
