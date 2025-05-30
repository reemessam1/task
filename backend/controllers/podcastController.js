// const axios = require('axios');
// const Podcast = require('../models/Podcast');

// exports.searchAndSave = async (req, res) => {
//   const term = req.query.term;
//   const url = `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(term)}`;

//   try {
//     const response = await axios.get(url);
//     const saved = await Promise.all(
//       response.data.results.map(async (item) => {
//         const podcast = new Podcast({
//           title: item.trackName,
//           artist: item.artistName,
//           url: item.trackViewUrl,
//         });
//         return podcast.save();
//       })
//     );
//     res.json(saved);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAll = async (req, res) => {
//   try {
//     const podcasts = await Podcast.find();
//     res.json(podcasts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const axios = require('axios');
const Podcast = require('../models/Podcast');

// ✅ البحث من iTunes وتخزين النتائج في MongoDB
exports.searchAndSave = async (req, res) => {
  const term = req.query.term;

  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }

  const url = `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(term)}`;

  try {
    const response = await axios.get(url);

    // فقط احتفظ بالنتائج التي تحتوي على معلومات كافية
    const saved = await Promise.all(
      response.data.results.map(async (item) => {
        const podcast = new Podcast({
          title: item.trackName,
          artist: item.artistName,
          url: item.trackViewUrl,
        });

        return await podcast.save();
      })
    );

    res.json(saved);

  } catch (error) {
    console.error("Error during iTunes search:", error);
    res.status(500).json({ error: "Something went wrong while fetching from iTunes." });
  }
};

// ✅ إرجاع جميع البودكاستات المحفوظة
exports.getAll = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch podcasts from database." });
  }
};
