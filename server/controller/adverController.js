const Advert = require("../modal/addverModal");

exports.createAd = async (req, res) => {
  try {
    const { description, expiryDate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Access the file buffer directly from req.file.buffer
    const fileBuffer = file.buffer;

    const newAd = new Advert({
      media: {
        data: fileBuffer, // Store the buffer directly
        contentType: file.mimetype,
      },
      mediaType: file.mimetype.startsWith("video") ? "video" : "image",
      description,
      expiryDate,
    });

    await newAd.save();

    res.status(201).json({ message: "Ad created successfully", ad: newAd });
  } catch (err) {
    console.error("Error creating ad:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMedia = async (req, res) => {
  try {

    const activeAds = await Advert.find(); // Don't send large media buffer here
    console.log(activeAds)
    res.status(200).json(activeAds);
  } catch (err) {
    console.error("Error fetching active ads:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;
    await Advert.findByIdAndDelete(id);
    res.status(200).send({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};