const Content = require("../modal/sectionModal");

// Add new content
exports.createContent = async (req, res) => {
  try {
    const { selectedLanguageName, selectedTitle, contentText } = req.body;

    const newContent = new Content({ selectedLanguageName, selectedTitle, contentText });
    await newContent.save();

    res.status(201).json({ message: "Content created successfully", data: newContent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create content", error });
  }
};

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch content", error });
  }
};

// Get content by selectedLanguageName (from route query or param)


// Get first content by selectedLanguageName (used for default display)
exports.getContentByLanguageAndTitle = async (req, res) => {
  const language = decodeURIComponent(req.params.language);
  const title = decodeURIComponent(req.params.title);

  console.log("Decoded Language:", language);
  console.log("Decoded Title:", title);

  try {
    const content = await Content.findOne({
      selectedLanguageName: language,
      selectedTitle: title,
    });
    console.log("Fetched Content:", content);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getLanguages = async (req, res) => {
  try {
    const languages = await Content.distinct("selectedLanguageName");
    res.json(languages);
  } catch (error) {
    console.error("Failed to fetch languages", error);
    res.status(500).json({ message: "Error" });
  }
};

exports.getTitlesByLanguage = async (req, res) => {
  const { language } = req.params;
  try {
    const titles = await Content.find({ selectedLanguageName: language }).select("selectedTitle");
    const uniqueTitles = [...new Set(titles.map(t => t.selectedTitle))];
    res.json(uniqueTitles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching titles" });
  }
};