# Tech Plan

Objectif : ajouter un ennemi qui se déplace en sinusoïde, tire en spread shot et se règle via JSON.

## Architecture

- `src/entities/Enemy.ts` : passage des champs et méthodes (`_bulletData`, `_shootTimer`, `shoot`, `move`) en `protected` + ajout de `createWeapon()` pour pouvoir dériver la classe.
- `src/entities/SinusoidalEnemy.ts` : hérite de `Enemy`, teinte bleue (`0x4cc9f0`), mouvement en courbe basé sur `y` dans `move()`, utilise `SpreadWeapon`.
- `src/components/Weapon.ts` & `src/components/SpreadWeapon.ts` : `SpreadWeapon` hérite de `Weapon` et tire N balles réparties sur l'angle voulu (éventail ou 360°).
- `public/assets/Data/sinusoidalEnemy.json` + `src/gameData/SinusoidalEnemyData.ts` : config du spawn rate, mouvement (`frequency`, `amplitude`) et spread shot (`bulletCount`, `spreadAngleDeg`), chargée dans `HomeScene.ts`.
- `src/managers/EntityManager.ts` : ajout d'un second pool pour `SinusoidalEnemy` avec son timer de spawn lu depuis le JSON, et factorisation des collisions.
