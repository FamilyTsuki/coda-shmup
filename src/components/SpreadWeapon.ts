import Phaser, {Physics} from 'phaser';
import {BulletData} from "../gameData/BulletData.ts";
import Entity from "../entities/Entity.ts";
import Weapon from "./Weapon.ts";

export default class SpreadWeapon extends Weapon {
    private _bulletCount: number;
    private _spreadAngleDeg: number;

    constructor(
        bullets: Physics.Arcade.Group,
        bulletData: BulletData,
        bulletCount: number = 3,
        spreadAngleDeg: number = 30
    ) {
        super(bullets, bulletData);
        this._bulletCount = bulletCount;
        this._spreadAngleDeg = spreadAngleDeg;
    }

    public override shoot(source: Entity) {
        if (!this.enabled)
            return;

        if (!this._bullets)
            return;

        if (this._bulletCount <= 1) {
            this.spawnBullet(source, 0);
            return;
        }

        const isFullCircle = this._spreadAngleDeg >= 360;
        const stepDeg = isFullCircle
            ? this._spreadAngleDeg / this._bulletCount
            : this._spreadAngleDeg / (this._bulletCount - 1);
        const startAngleDeg = isFullCircle ? 0 : -this._spreadAngleDeg / 2;

        for (let i = 0; i < this._bulletCount; i++) {
            const angleOffsetDeg = startAngleDeg + i * stepDeg;
            const angleOffsetRad = Phaser.Math.DegToRad(angleOffsetDeg);
            this.spawnBullet(source, angleOffsetRad);
        }
    }
}
