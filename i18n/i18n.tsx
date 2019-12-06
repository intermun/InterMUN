export default class I18n {
  static _translations: {
    [key: string]: string;
  } = {
    fullName: "Full Name",
    highSchool: "High School",
    email: "Email",
    committee: "Committee",
    country: "Country"
  };
  static t(str: string): string {
    return I18n._translations[str];
  }
}
