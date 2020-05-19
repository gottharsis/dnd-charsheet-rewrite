import * as R from "ramda";
export class HitDice {
  amount = 0;
  die = 0;
  toString() {
    return `${this.amount}d${this.die}`;
  }
}

export class Health {
  hp = 0;
  maxHp = 0;
  tempHp = 0;
  hitDice = [];
  deathSaves = {
    fail: 0,
    success: 0
  };
  exhaustion = 0;

  constructor(health) {
    Object.assign(
      this,
      R.pick(["hp", "maxHp", "tempHp", "exhaustion", "deathSaves"], health)
    );
    this.hitDice = R.pipe(
      R.propOr([], "hitDice"),
      R.map(i => new HitDice(i))
    );
  }

  heal(amount = this.maxHp) {
    this.hp = Math.min(this.hp + amount, this.maxHp);
  }

  damage(amount) {
    let dmg = amount;
    dmg -= this.tempHp;
    this.tempHp = Math.max(this.tempHp, 0);

    if (dmg <= 0) return;
    this.hp = Math.max(0, this.hp - dmg);
  }

  resetDeathSaves() {
    this.deathSaves = {
      fail: 0,
      success: 0
    };
  }

  /**
   * Return true if you died
   */
  failDeathSave() {
    return ++this.deathSaves.fail >= 3;
  }

  /**
   * Returns true if you gained hp
   */
  succeedDeathSave() {
    ++this.deathSaves.success;
    if (this.deathSaves.success >= 3) {
      this.hp = 1;
      this.resetDeathSaves();
      return true;
    }
    return false;
  }
}
