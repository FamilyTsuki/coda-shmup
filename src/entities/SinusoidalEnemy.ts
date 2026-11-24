import { Scene } from "phaser";
import SpreadWeapon from "../components/SpreadWeapon.ts";
import Weapon from "../components/Weapon.ts";
import type { BulletData } from "../gameData/BulletData.ts";
import Enemy from "./Enemy.ts";

export default class SinusoidalEnemy extends Enemy {
    protected _frequency: number = 0.003;
    protected _amplitude: number = 60;
    protected _tintColor: number = 0x4cc9f0;
    protected _bulletCount: number = 3;
    protected _spreadAngleDeg: number = 30;

    protected override _bulletData: BulletData = {
        width: 10,
        height: 10,
        color: 0x4cc9f0,
        speed: 400,
        damage: 1,
    };

    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string = "sprites",
        frame: string = "ufoRed",
    ) {
        super(scene, x, y, texture, frame);
    }

    protected override createWeapon(
        bulletsGroup: Phaser.Physics.Arcade.Group,
    ): Weapon {
        return new SpreadWeapon(
            bulletsGroup,
            this._bulletData,
            this._bulletCount,
            this._spreadAngleDeg,
        );
    }

    public override init(bulletsGroup: Phaser.Physics.Arcade.Group): void {
        super.init(bulletsGroup);
        this.setTint(this._tintColor);
    }

    public override enable(x: number, y: number): void {
        super.enable(x, y);
        this.setTint(this._tintColor);
    }

    public override disable(): void {
        super.disable();
    }

    protected override move(deltaTime: number): void {
        super.move(deltaTime);

        const period = 1 / this._frequency;
        const halfPeriod = period / 2;
        const quarterPeriod = halfPeriod / 2;

        let positionInCycle = this.y % period;
        if (positionInCycle < 0) {
            positionInCycle += period;
        }

        let direction: number;
        let positionInHalf: number;
        if (positionInCycle < halfPeriod) {
            direction = 1;
            positionInHalf = positionInCycle;
        } else {
            direction = -1;
            positionInHalf = positionInCycle - halfPeriod;
        }

        const t = (positionInHalf - quarterPeriod) / quarterPeriod;
        const smoothFactor = 1 - t * t;

        const speedX = this._amplitude * this._frequency * 0.6 * smoothFactor;

        this.x += direction * speedX * deltaTime;
    }

    protected override shoot(): void {
        this.play("ufoShoot");
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.setTexture("sprites", "ufoRed");
            this.setTint(this._tintColor);

            this.getComponent(Weapon)?.shoot(this);
            this.scene.sound.play("sfx_laser2");
        });
    }
}
