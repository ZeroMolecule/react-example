export default class Rules {
  constructor (rules, messages = {}) {
    this._rules = rules ? rules.split('|') : [];
    this._messages = messages;
  }

  get rules () {
    return this._rules.join('|');
  }

  get messages () {
    return this._messages;
  }


  addRule (name, arg) {
    this._rules.push(`${name}${arg ? `:${arg}` : ''}`);
    return this;
  }

  addMessage (key, msg) {
    this._messages[key] = msg;
    return this;
  }

  addMessages (messages = {}) {
    Object.entries(messages).forEach(([key, value]) => {
      this.addMessage(key, value);
    });

    return this;
  }

  required () {
    return this.addRule('required');
  }

  email () {
    return this.addRule('email');
  }

  min (num) {
    return this.addRule('min', num);
  }

  max (num) {
    return this.addRule('max', num);
  }
}
