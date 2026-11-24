import { Scene } from "phaser";
import Weapon from "../components/Weapon.ts";
import type { BulletData } from "../gameData/BulletData.ts";
import Enemy from "./Enemy.ts";

export default class SinusoidalEnemy extends Enemy {
    protected _frequency: number = 0.003;
    protected _amplitude: number = 60;
    protected _tintColor: number = 0x4cc9f0;

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
        frame: string = "ufoRed"
    ) {
        super(scene, x, y, texture, frame);
    }

    public override init(bulletsGroup: Phaser.Physics.Arcade.Group): void {
        super.init(bulletsGroup);
    }

    public override enable(x: number, y: number): void {
        super.enable(x, y);
    }

    public override disable(): void {
        super.disable();
    }

    protected override move(deltaTime: number): void {
        super.move(deltaTime);

        //TODO this.x =
    }

    protected override shoot(): void {
        this.play("ufoShoot");
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.setTexture("sprites", "ufoRed");

            this.getComponent(Weapon)?.shoot(this);
            this.scene.sound.play("sfx_laser2");
        });
    }
}
