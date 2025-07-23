const { cmd } = require('../command');
const moment = require('moment-timezone');
const { performance } = require('perf_hooks');

function runtime() {
  let seconds = process.uptime();
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  desc: "Stylish ping with heartbeat",
  category: "system",
  filename: __filename
}, async (Void, m, text) => {
  const start = performance.now();
  const jtime = moment.tz('Africa/Nairobi').format("HH:mm:ss");
  const jdate = moment.tz('Africa/Nairobi').format("DD/MM/YY");
  const uptime = runtime();

  // 👤 Fake verified contact quoted
  const quotedContact = {
    key: {
      fromMe: false,
      remoteJid: "status@broadcast",
      id: "PK-XMD-BLUE-TICK"
    },
    message: {
      contactMessage: {
        displayName: "Pkdriller ✓",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Pkdriller ✓\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD"
      }
    }
  };

  // 📢 Newsletter style + Ad thumbnail
  const contextInfo = {
    externalAdReply: {
      title: "⚡ PK-XMD • Ping Command",
      body: `🕒 ${jtime} | 📅 ${jdate}`,
      thumbnailUrl: 'https://files.catbox.moe/fgiecg.jpg',
      sourceUrl: 'https://github.com/mejjar00254/PK-XMD',
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    },
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "PK-XMD Official",
      serverMessageId: "",
    }
  };

  const end = performance.now();
  const speed = (end - start).toFixed(2);

  // 🔹 Send ping info
  await Void.sendMessage(m.chat, {
    text: `*⚡Ping:* ${speed}ms\n*⏱️Uptime:* ${uptime}`,
    contextInfo
  }, { quoted: quotedContact });

  // 💓 Animated emoji heartbeat
  const emojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'];
  const sent = await Void.sendMessage(m.chat, {
    text: emojis[0],
    contextInfo
  }, { quoted: quotedContact });

  for (let i = 1; i < emojis.length; i++) {
    await sleep(1000);
    await Void.sendMessage(m.chat, {
      text: emojis[i],
      edit: sent.key,
      contextInfo
    });
  }
});
