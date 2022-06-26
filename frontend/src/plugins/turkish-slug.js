function slug(text) {
  if (typeof text !== "string") {
    return text;
  }

  var trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };
  for (var key in trMap) {
    text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
  }

  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
    .replace(/\s/gi, "-") // convert spaces to dashes
    .replace(/[-]+/gi, "-") // trim repeated dashes
    .toLowerCase();
}

export const TurkishSlugPlugin = {
  install() {
    String.prototype.slug = function () {
      return slug(this);
    };
  },
};
