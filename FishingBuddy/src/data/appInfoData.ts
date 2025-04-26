import { AppInfoFeatures } from "../types/types";
import { strings } from "../common/strings";

// App info features data
const appInfoFeaturesStrings = strings.appInfo.features;
export const appInfoFeatures: AppInfoFeatures[] = [
  {
    title: appInfoFeaturesStrings.smartFishingSpots.title,
    description: appInfoFeaturesStrings.smartFishingSpots.description,
    icon: "location",
  },
  {
    title: appInfoFeaturesStrings.catchLogging.title,
    description: appInfoFeaturesStrings.catchLogging.description,
    icon: "fish",
  },
  {
    title: appInfoFeaturesStrings.weatherInsights.title,
    description: appInfoFeaturesStrings.weatherInsights.description,
    icon: "partly-sunny",
  },
  {
    title: appInfoFeaturesStrings.tripManagement.title,
    description: appInfoFeaturesStrings.tripManagement.description,
    icon: "compass",
  },
  {
    title: appInfoFeaturesStrings.catchHistory.title,
    description: appInfoFeaturesStrings.catchHistory.description,
    icon: "time",
  },
];
