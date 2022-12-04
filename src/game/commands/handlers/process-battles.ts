import { GlobalGameBlackboard } from '../../core/game-context';
import { Army } from '../../entities/army';
import { Empire } from '../../entities/empire';

export const processBattles = () => {
  const armies = GlobalGameBlackboard.instance.getAllEntities<Army>('ARMY');

  // TODO: review battle logic, what happens when multiple armies are in the same location?
  for (const army of armies) {
    for (const enemyArmy of armies) {
      if (
        army.empireId !== enemyArmy.empireId &&
        army.regionId === enemyArmy.regionId
      ) {
        if (army.attack - enemyArmy.defense > 0) {
          const armyEmpire = GlobalGameBlackboard.instance.getEntity<Empire>(
            'EMPIRE',
            army.empireId
          );
          const enemyArmyEmpire =
            GlobalGameBlackboard.instance.getEntity<Empire>(
              'EMPIRE',
              enemyArmy.empireId
            );

          enemyArmy.size -= army.attack - enemyArmy.defense;

          console.log(
            `ARMY FROM "${armyEmpire.name}" ATTACKED ARMY FROM "${
              enemyArmyEmpire.name
            }" CAUSING ${army.attack - enemyArmy.defense} DAMAGE!`
          );
        }
      }
    }
  }
};
