/**
 * @name EnhanceScreenShare
 * @description Sets screenshare quality to 1080p and 60 FPS.
 * @version 1.0.0
 */

const config = {
    info: {
        name: "EnhanceScreenShare",
        authors: [
            {
                name: "YourName",
                discord_id: "YourDiscordID",
                github_username: "YourGitHubUsername"
            }
        ],
        version: "1.0.0",
        description: "Sets screenshare quality to 1080p and 60 FPS."
    }
};

module.exports = class EnhanceScreenShare {
    constructor() {
        this.settings = {};
    }

    start() {
        this.overrideScreenshareSettings();
    }

    stop() {
        // Optional: Clean up when the plugin is stopped
    }

    overrideScreenshareSettings() {
        const originalSetVideoQuality = WebRTC.prototype.setVideoQuality;

        WebRTC.prototype.setVideoQuality = function (videoQuality) {
            console.log("EnhanceScreenShare: Overriding video quality settings");

            videoQuality.width = 1920;
            videoQuality.height = 1080;
            videoQuality.frameRate = 60; // Setting to the highest practical FPS

            return originalSetVideoQuality.apply(this, arguments);
        };

        // Apply immediately if WebRTC is already initialized
        if (WebRTC.getInstance()) {
            WebRTC.getInstance().setVideoQuality(WebRTC.getInstance().getVideoQuality());
        }
    }
};
