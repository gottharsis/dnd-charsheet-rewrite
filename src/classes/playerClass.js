import * as R from "ramda";
export class PlayerClass {
  name = "";
  level = 0;
  subclass = "";
  constructor(playerClass = {}) {
    Object.assign(this, R.pick(["name", "level", "subclass"], playerClass));
  }

  toString() {
    return `${this.subclass} ${this.name} ${this.level}`;
  }
}

export class Classes {
  _classes = [];
  constructor(classes = []) {
    this._classes = classes.map(i => new PlayerClass(i));
  }

  totalLevel() {
    return R.compose(R.sum, R.pluck("level"));
  }

  toString() {
    return this._classes.map(i => i.toString()).join("/");
  }
}
