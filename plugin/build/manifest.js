const { AndroidConfig, withAndroidManifest } = require("@expo/config-plugins");

const { getMainApplicationOrThrow, addMetaDataItemToMainApplication } = AndroidConfig.Manifest;

function addAttributesToMainActivity(androidManifest) {
    const { manifest } = androidManifest;

    if (!Array.isArray(manifest["application"])) {
        console.warn(
            "withWorldLineIntentActivity: No application array in manifest?"
        );
        return androidManifest;
    }

    const application = manifest["application"].find(
        (item) => item.$["android:name"] === ".MainApplication"
    );

    if (!application) {
        console.warn("withWorldLineIntentActivity: No .MainApplication?");
        return androidManifest;
    }

    if (!Array.isArray(application["activity"])) {
        console.warn(
            "withWorldLineIntentActivity: No activity array in .MainApplication?"
        );
        return androidManifest;
    }

    const activity = application["activity"].find(
        (item) => item.$["android:name"] === ".MainActivity"
    );

    if (!activity) {
        console.warn("withWorldLineIntentActivity: No .MainActivity?");
        return androidManifest;
    }

    // Ensure intent-filter array exists
    if (!Array.isArray(activity["intent-filter"])) {
        activity["intent-filter"] = [];
    }

    // Create action object
    const action = {
        $: {
            "android:name": "us.domkalan.expo-datawedge.ACTION",
        },
    };

    // Create category object
    const category = {
        $: {
            "android:name": "android.intent.category.DEFAULT",
        },
    };

    // Create intent-filter with action and category
    const intentFilter = {
        action: [action],
        category: [category],
    };

    // Add the intent-filter to the activity
    activity["intent-filter"].push(intentFilter);

    return androidManifest;
}

module.exports = function withIntentActivity(config) {
    return withAndroidManifest(config, (config) => {
        config.modResults = addAttributesToMainActivity(config.modResults);
        return config;
    });
};