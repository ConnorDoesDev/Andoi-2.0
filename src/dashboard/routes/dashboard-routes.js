const express = require("express");
const moment = require("moment");
const Message = require("../../models/message");
const { validateGuild } = require("../modules/middleware");
const client = require("../../bot");

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard/index");
});

router.get("/servers/:id", validateGuild, async (req, res) => {
  async function getInfo() {
    const guildCLIENT = client.guilds.cache.get(req.params.id);
    const guild = await client.getConfig(guildCLIENT);
    const hourlyMessages = Message.aggregate([
      {
        $match: {
          guildID: req.params.id,
          createdAt: {
            $gte: moment(Date.now()).subtract(7, "days").toDate(),
          },
        },
      },
      {
        $project: {
          y: { $year: "$createdAt" },
          m: { $month: "$createdAt" },
          d: { $dayOfMonth: "$createdAt" },
          h: { $hour: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { year: "$y", month: "$m", day: "$d", hour: "$h" },
          count: { $sum: 1 },
        },
      },
    ]);
    const messageCounts = Message.aggregate([
      {
        $match: {
          guildID: req.params.id,
          createdAt: {
            $gte: moment(Date.now()).subtract(14, "days").toDate(),
          },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$updatedAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const info = {
      guild: guild,
      hourlyMessages: await hourlyMessages,
      messageCounts: await messageCounts,
    };
    return info;
  }

  const data = await getInfo();
  const ownerData = await client.guilds.cache.get(req.params.id).fetchOwner();
  const owner = ownerData.user.username;
  res.render("dashboard/show", {
    savedGuild: data.guild,
    hourlyMessages: data.hourlyMessages,
    messageCounts: data.messageCounts,
    owner,
  });
});

router.put("/servers/:id/:module", validateGuild, async (req, res) => {
  try {
    const { id, module } = req.params;

    if (module == "general") {
      let settings = {};

      // Prefix
      settings.prefix = req.body.prefix;

      // Welcome message
      settings.welcomeMessage = {};
      if (req.body.welcomeMessageEnabled == "on") {
        settings.welcomeMessage.enabled = true;
        settings.welcomeMessage.message = req.body.welcomeMessage;
        settings.welcomeMessage.channelID = req.body.welcomeMessageChannel;
      } else {
        settings.welcomeMessage.enabled = false;
      }
      settings.leaveMessage = {};
      if (req.body.leaveMessageEnabled == "on") {
        settings.leaveMessage.enabled = true;
        settings.leaveMessage.message = req.body.leaveMessage;
        settings.leaveMessage.channelID = req.body.leaveMessageChannel;
      } else {
        settings.leaveMessage.enabled = false;
      }
      settings.chatbot = null;
      if (req.body.chatbotChannel) {
        settings.chatbot = req.body.chatbotChannel;
      } else {
        settings.chatbot = null;
      }
      const guild = client.guilds.cache.get(id);
      await client.updateConfig(guild, settings);
    }

    res.redirect(`/servers/${id}`);
  } catch (err) {
    res.render("errors/400");
    console.error(err);
  }
});

module.exports = router;
