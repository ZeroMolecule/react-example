export default class List {
  constructor (list = []) {
    this.list = list;
  }

  get length () {
    return this.getList().length;
  }

  setList (list) {
    this.list = list;
    return this;
  }

  getList () {
    return this.list;
  }

  empty () {
    return !!this.list.length;
  }

  findBy (key, value) {
    return this.getList().find(item => item[key] === value);
  }

  findById (id) {
    return this.findBy('id', id);
  }

  filter (cb) {
    return new this.constructor(this.getList().filter(cb));
  }

}
