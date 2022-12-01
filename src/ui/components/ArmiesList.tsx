import { useContext, useEffect, useState } from 'react';
import { EntityId } from '../../game/entities';
import { Army } from '../../game/entities/army';
import { Empire } from '../../game/entities/empire';
import { Region } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const ArmiesList = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
  const [armies, setArmies] = useState<Army[]>([]);

  useEffect(() => {
    const playerEmpire = game.context
      .getAllEntities<Empire>('EMPIRE')
      .find((empire) => empire.isPlayer);

    if (!playerEmpire) return;

    const armies = game.context
      .getAllEntities<Army>('ARMY')
      .filter((army) => army.empireId === playerEmpire.id);

    setArmies(armies);
  }, [uiState]);

  const handleClick = (armyId: EntityId) =>
    setUIState({
      ...uiState,
      selected_agent_id: undefined,
      selected_army_id: armyId,
    });

  return (
    <>
      <h3>ARMIES</h3>
      <ul>
        {armies.map((army, index) => (
          <li
            key={index}
            onClick={() => handleClick(army.id)}
            style={{
              color: uiState.selected_army_id === army.id ? 'red' : 'black',
            }}
          >
            Army #{index} |{' '}
            {game.context.getEntity<Region>('REGION', army.regionId).name}
          </li>
        ))}
      </ul>
    </>
  );
};