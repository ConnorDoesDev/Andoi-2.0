const ms = require("ms");
const defaultFooter = "Page {page}/{pages} (this times out in {time})";
async function paginate(msg, pages, options = { customFooter: false }) {
  const endEmoji = "🗑️";
  const emojiList = ["⏪", "◀️", "▶️", "⏩"];
  const timeout = 120000;
  let page = 0;
  const curPage = await msg.channel.send({
    embeds: [
      options.customFooter
        ? pages[page].setFooter(
            options.footer
              .replace("{page}", page + 1)
              .replace("{pages}", pages.length)
              .replace("{time}", ms(timeout, { long: true }))
          )
        : pages[page].setFooter(
            defaultFooter
              .replace("{page}", page + 1)
              .replace("{pages}", pages.length)
              .replace("{time}", ms(timeout, { long: true }))
          ),
    ],
  });
  await curPage.react(emojiList[0]);
  await curPage.react(emojiList[1]);
  await curPage.react(endEmoji);
  await curPage.react(emojiList[2]);
  await curPage.react(emojiList[3]);

  const reactionCollector = curPage.createReactionCollector({
    filter: (reaction, user) =>
      (emojiList.includes(reaction.emoji.name) ||
        reaction.emoji.name === endEmoji) &&
      !user.bot,
    time: timeout,
  });

  reactionCollector.on("collect", (reaction) => {
    reaction.users.remove(msg.author).catch(() => {});
    switch (reaction.emoji.name) {
      case emojiList[1]:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case emojiList[2]:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case emojiList[0]:
        page = 0;
        break;
      case emojiList[3]:
        page = pages.length - 1;
        break;
      case endEmoji:
        reactionCollector.stop();
        break;
      default:
        break;
    }

    curPage.edit({
      embeds: [
        options.customFooter
          ? pages[page].setFooter(
              options.footer
                .replace("{page}", page + 1)
                .replace("{pages}", pages.length)
                .replace("{time}", ms(timeout, { long: true }))
            )
          : pages[page].setFooter(
              defaultFooter
                .replace("{page}", page + 1)
                .replace("{pages}", pages.length)
                .replace("{time}", ms(timeout, { long: true }))
            ),
      ],
    });
  });

  reactionCollector.on("end", async () => {
    await curPage.reactions.removeAll().catch(() => {});
    if (curPage.embeds[0]) {
      curPage.edit(curPage.embeds[0].setFooter("Timed out")).catch(() => {});
    }
  });
  return curPage;
}
module.exports = paginate;
