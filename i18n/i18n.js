export default class I18n {
  static _translations = {
    fullName: "Full Name",
    highSchool: "High School",
    email: "Email",
    committee: "Committee",
    country: "Country"
  };
  static t(str) {
    return I18n._translations[str];
  }
}
