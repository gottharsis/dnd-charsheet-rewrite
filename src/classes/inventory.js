import { v4 as uuid } from "uuid";
import * as R from "ramda";

const cpTable = {
  gp: 100,
  sp: 10,
  cp: 1,
  pp: 1000
};

export class Wealth {
  gp = 0;
  sp = 0;
  cp = 0;
  // pp = 0;

  constructor(wealth = {}) {
    Object.assign(this, R.pick(["gp", "sp", "cp"], wealth));
    let cpequiv = 100 * this.gp + 10 * this.sp + this.cp;
    Object.defineProperty(this, "_cpEquivalent", {
      value: cpequiv,
      writable: true
    });
  }

  /**
   * Adds money to the Wealth
   * @param {Number} amount The amount to add
   * @param {string} denomination the coin
   */
  add(amount, denomination = "gp") {
    denomination = denomination.toLowerCase();
    this[denomination] += amount;
    this._cpEquivalent += amount * cpTable[denomination];
  }

  /**
   * Removes money from the Wealth
   * @param {Number} amount The amount to spend
   * @param {string} denomination the denomination
   */
  subtract(amount, denomination) {
    denomination = denomination.toLowerCase();
    let cpAmount = cpTable[denomination] * amount;
    if (cpAmount > this._cpEquivalent) {
      throw "Not enough money!";
    }

    this._cpEquivalent -= cpAmount;
    let x = this._cpEquivalent;
    this.cp = x % 10;
    x /= 10;
    this.sp = x % 10;
    x /= 10;
    this.gp = x;
  }
}

export class Item {
  id = "";
  name = "";
  weight = 0;
  description = "";
  quantity = 0;

  constructor(item = {}) {
    Object.assign(
      this,
      R.pick(["id", "name", "weight", "description", "quantity"], item)
    );
    if (!this.id) {
      this.id = "item_" + uuid();
    }
  }
}

export class MagicItem {
  name = "";
  weight = 0;
  description = "";
  requiresAttunement = false;
  isAttuned = false;
  charges = 0;
  remainingCharges = null;
  id = "";

  constructor(magicItem = {}) {
    this.id = "magic-item_" + uuid();
    Object.assign(
      this,
      R.pick(
        [
          "name",
          "weight",
          "descripton",
          "requiresAttunement",
          "isAttuned",
          "charges",
          "remainingCharges",
          "id"
        ],
        magicItem
      )
    );

    if (R.isNil(this.remainingCharges)) {
      this.remainingCharges = this.charges;
    }

    if (R.isEmpty(this.id)) {
      this.id = "magic-item_" + uuid();
    }
  }

  /**
   * Use some charges of the magic item
   * @param {Number} amount the number of charges to use, default 1
   */
  useCharges(amount = 1) {
    if (amount > this.remainingCharges) {
      throw "Not enough charges";
    }
    this.remainingCharges -= amount;
  }

  /**
   * Restore charges to the magic item
   * @param {Number} amount the number of charges to restore
   */
  restore(amount = -1) {
    if (amount < 0) {
      this.remainingCharges = this.charges;
    } else {
      this.remainingCharges = Math.min(
        this.charges,
        this.remainingCharges + amount
      );
    }
  }
}

export class Weapon {
  name = "";
  damage = "";
  weight = 0;
  category = "";
  properties = "";
  id = "";

  constructor(weapon = {}) {
    Object.assign(
      this,
      R.pick(
        ["name", "damage", "weight", "category", "properties", "id"],
        weapon
      )
    );
    if (!this.id) {
      this.id = "weapon_" + uuid();
    }
  }
}

export class Inventory {
  wealth = null;
  items = [];
  magicItems = [];
  weapons = [];

  constructor(inventory = {}) {
    this.wealth = new Wealth(inventory.wealth);

    this.items = inventory.items ? inventory.items.map(i => new Item(i)) : [];
    this.magicItems = inventory.magicItems
      ? inventory.magicItems.map(i => new MagicItem(i))
      : [];

    this.magicItems = inventory.weapons
      ? inventory.weapons.map(i => new Weapon(i))
      : [];
  }

  get attunedItems() {
    return this.magicItems.map(i => (i.isAttuned ? 1 : 0)).reduce(R.add, 0);
  }
}
