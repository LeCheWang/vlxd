class _StorageService { 
  constructor() {
    this.prefix = "app";
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // Local storage
  set(key, data) {
    this.localStorage.setItem(this.generateKey(key), data.toString());
  }

  get(key) {
    return this.localStorage.getItem(this.generateKey(key));
  }

  setObject(key, data) {
    this.set(key, JSON.stringify(data));
  }

  getObject(key) {
    const value = this.get(key);

    return value ? JSON.parse(value) : null;
  }

  remove(key) {
    return this.localStorage.removeItem(this.generateKey(key));
  }

  // Session storage
  setSession(key, data) {
    this.sessionStorage.setItem(this.generateKey(key), data.toString());
  }

  getSession(key) {
    return this.sessionStorage.getItem(this.generateKey(key));
  }

  setSessionObject(key, data) {
    this.setSession(key, JSON.stringify(data));
  }

  getSessionObject(key) {
    const value = this.getSession(key);

    return value ? JSON.parse(value) : null;
  }

  generateKey(key) {
    return `${this.prefix}_${key}`;
  }
}

const StorageService = new _StorageService();

export default StorageService;
