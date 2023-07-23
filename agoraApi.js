const axios = require("axios");

const getAgoraResourceId = async (req, res) => {
  //const { appId } = req.body;
  const appId = "85bdc13bd8584ec7a515cfd4c7a81e7f";
  const channelName = "test";
  const agoraUserId = "556611605";
  const Authorization =
    "Basic Zjc0ZDZmZDM5NTUwNDczNDg4Zjc2ZDA1Y2Q5ODAwYmU6OGQyZGRiMGUyNGQwNGY0OGFkNjVjNzRhMTM5MTZhMjQ=";
  try {
    const ResourceIdResponse = await axios.post(
      `https://api.agora.io/v1/apps/${appId}/cloud_recording/acquire`,
      {
        cname: channelName,
        uid: agoraUserId,
        clientRequest: {
          resourceExpiredHour: 24,
        },
      },
      { headers: { Authorization } }
    );
    //console.log(ResourceIdResponse.data);
    res.json(ResourceIdResponse.data);
  } catch (error) {
    console.log(" error", error);
    res.status(500).json({ error: "something Wrong" });
  }
};

module.exports = {
  getAgoraResourceId,
};
