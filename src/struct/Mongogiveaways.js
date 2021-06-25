const { GiveawaysManager } = require("@tovade/discord-giveaways");
const GiveawayModel = require("../models/giveaway");
module.exports = class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return GiveawayModel.find();
  }

  async saveGiveaway(messageID, giveawayData) {
    await GiveawayModel.create(giveawayData);

    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await GiveawayModel.findOneAndUpdate(
      { messageID: messageId },
      giveawayData
    ).exec();

    return true;
  }

  // @ts-expect-error ignore
  async deleteGiveaway(messageId) {
    await GiveawayModel.findOneAndDelete({ messageID: messageId }).exec();

    return true;
  }
};
