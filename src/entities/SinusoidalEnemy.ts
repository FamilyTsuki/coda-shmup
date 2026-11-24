import SpreadWeapon from "../components/SpreadWeapon.ts";
import Weapon from "../components/Weapon.ts";
import type {BulletData} from "../gameData/BulletData.ts";
import Enemy from "./Enemy.ts";

export default class SinusoidalEnemy extends Enemy {
    private static readonly TINT_COLOR: number = 0x4cc9f0;

    protected _frequency: number = 0.003;
    protected _amplitude: number = 60;
    protected _bulletCount: number = 3;
    protected _spreadAngleDeg: number = 30;

    private _offsetX: number = 0;
    private _velocityX: number = 0;

    protected override _bulletData: BulletData = {
        width: 10,
        height: 10,
        color: SinusoidalEnemy.TINT_COLOR,
        speed: 400,
        damage: 1,
    };

    protected override createWeapon(bulletsGroup: Phaser.Physics.Arcade.Group): Weapon {
        return new SpreadWeapon(bulletsGroup, this._bulletData, this._bulletCount, this._spreadAngleDeg);
    }

    public override init(bulletsGroup: Phaser.Physics.Arcade.Group) {
        super.init(bulletsGroup);
        this.setTint(SinusoidalEnemy.TINT_COLOR);
    }

    public override enable(x: number, y: number) {
        super.enable(x, y);
        this.setTint(SinusoidalEnemy.TINT_COLOR);

        this._offsetX = 0;
        this._velocityX = this._amplitude * this._frequency;
    }

    protected override restoreDefaultTint() {
        this.setTint(SinusoidalEnemy.TINT_COLOR);
    }

    protected override move(deltaTime: number) {
        super.move(deltaTime);

        const acceleration = -this._frequency * this._frequency * this._offsetX;
        this._velocityX += acceleration * deltaTime;

        const step = this._velocityX * deltaTime;
        this._offsetX += step;
        this.x += step;
    }
}
