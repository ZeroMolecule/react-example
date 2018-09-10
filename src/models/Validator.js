import indicative from 'indicative';

export default class Validator {
  constructor (data = {}, rules = {}, messages = {}) {
    this._data = data;
    this._rules = rules;
    this._messages = messages;
  }

  addData = (data) => {
    this._data = Object.assign(this._data, data);
    return this;
  };

  addRules (key, rules) {
    this._rules[key] = rules.rules;
    Object.entries(rules.messages).forEach(([msgKey, msg]) => {
      this._messages[`${key}.${msgKey}`] = msg;
    });
    return this;
  }

  validateAll () {
    return indicative.validateAll(this._data, this._rules, this._messages);
  }
}
