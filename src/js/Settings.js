const DEFAULT_SETTINGS = {
  enableUser: false,
  showView: false,
  showEditor: false,
  showCommands: false,
  showState: false
};

class Settings {

  static getStorageKey(name) {
    return `exampleSettings${name}`;
  }

  static getSettings(exampleName) {
    const key = Settings.getStorageKey(exampleName);
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(DEFAULT_SETTINGS));
    }
    return JSON.parse(localStorage.getItem(key));
  }

  static saveSettings(exampleName, settings) {
    const key = Settings.getStorageKey(exampleName);
    localStorage.setItem(key, JSON.stringify(settings));
  }

}

export default Settings;