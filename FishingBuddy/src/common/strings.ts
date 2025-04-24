export const strings = {
  welcome: {
    intro: {
      title: "Welcome Aboard",
      subtitle: "The water is calm • Perfect time to fish",
    },
  },
  tripAssistant: {
    intro: {
      title: "Your Ultimate Fishing Trip Planner",
      subtitle:
        "We've prepared a personalized guide to make sure your fishing trip is smooth, safe, and successful.",
      button: "Get Started",
    },
    checkList: {
      title: "Trip Checklist",
      subtitle: "Tap each item once you've packed it",
      button: "Continue",
      reset: "Reset",
      addItem: "Add Item",
      remove: "Remove",
      addCustomItem: "Add custom item...",
      items: {
        fishingLicense: "Fishing license",
        fishingRod: "Fishing rod and reel combo",
        fishingLine: "Fishing line (monofilament or braided)",
        hooks: "Hooks (size 2 to 6)",
        sinkers: "Sinkers",
        lures: "Lures",
        bait: "Bait",
        pliers: "Pliers or forceps",
        net: "Net",
        firstAidKit: "First aid kit",
        sunscreen: "Sunscreen and insect repellent",
        hat: "Hat and comfortable clothing",
      },
    },
    progress: {
      label: "Your Progress",
      percentage: "{{percentage}}% Complete",
    },
    location: {
      title: "Select a Fishing Spot",
      button: {
        next: "Next",
        skip: "Skip",
      },
      key: {
        spots: "Spots",
        favorite: "Favorite",
        selected: "Selected",
        you: "You",
      },
      map: {
        loading: "Loading map...",
        yourLocation: "Your Location",
      },
      overlay: {
        noSpot: "No spot selected",
      },
    },
    weather: {
      title: "Weather at {{spotName}}",
      good: "Perfect weather to go fishing. Go Fish!",
      bad: "⚠️ Conditions may not be ideal today.",
      button: {
        next: "I can handle it. Next!",
        exit: "Exit",
      },
      updated: "Updated {{timeAgo}}",
      loading: "Checking the weather...",
      wind: "Wind: {{windSpeed}} km/h",
    },
    license: {
      title: "Fishing License Reminder",
      text: "Depending on your region, a valid fishing license may be required.",
      note: "Make sure you're compliant with local fishing laws before starting your trip.",
      button: {
        next: "I'm ready to go!",
        exit: "Exit",
        skip: "Skip",
      },
    },
    endTime: {
      title: "Set Trip End Time",
      subtitle: "Would you like to set a time when your trip ends?",
      noTime: "No time selected",
      alert: {
        title: "No End Time and Emergency Contact set",
        message: "If you skip, you won't get any reminders or safety alerts.",
        cancel: "Cancel",
        proceed: "Proceed Anyway",
      },
      button: {
        setTime: "Set Time",
        continue: "Continue",
        exit: "Exit",
        skip: "Skip",
      },
    },
    start: {
      title: "Ready to Start Your Trip!",
      subtitle: "You're all set to start fishing at {{spotName}}",
      weather: "Weather: {{description}}, {{temperature}}°C",
      wind: "Wind: {{windSpeed}} km/h",
      endTime: "Planned end time: {{time}}",
      button: {
        start: "Start Trip!",
        back: "Back",
      },
    },
  },
};
