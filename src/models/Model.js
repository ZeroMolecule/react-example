import isNil from 'lodash/isNil';

export default class Model {
  constructor(data = {}) {
    this.data = data;
  }

  set(key, value) {
    this.data[key] = value;
    return this;
  }

  get(key) {
    const keys = key.split('.');
    let value = this.data;
    keys.forEach((item) => {
      value = value[item];
    });
    return isNil(value) ? null : value;
  }

  getData() {
    return { ...this.data };
  }

  get id() {
    return this.get('id');
  }

  clone() {
    return new this.constructor(this.getData());
  }
}
