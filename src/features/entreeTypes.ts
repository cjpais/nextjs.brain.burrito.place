export const entreeTypes = ["text", "image", "video", "audio"];

export const getEmojiForType = (type: string) => {
  switch (type) {
    case "text":
      return "📝";
    case "image":
      return "🖼";
    case "video":
      return "🎥";
    case "audio":
      return "🗣️";
    default:
      return "🟥";
  }
};
