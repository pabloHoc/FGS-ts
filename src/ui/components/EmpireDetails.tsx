import { useContext, useEffect, useState } from 'react';
import { Empire } from '../../game/entities/empire';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const EmpireDetails = () => {
  const game = useContext(GameCtx);
  const { uiState } = useContext(UIStateCtx);
  const [empire, setEmpire] = useState<Empire>();

  const updateEmpire = () => {
    // * This can be cached
    const playerEmpire = game.context
      .getAllEntities<Empire>('EMPIRE')
      .find((empire) => empire.isPlayer);
    setEmpire(playerEmpire ? { ...playerEmpire } : undefined);
  };

  useEffect(updateEmpire, [uiState]);

  if (!empire) return null;

  return (
    <div>
      <h3>EMPIRE {empire.name}</h3>
      <ul>
        {Object.keys(empire.resources).map((resource) => (
          <li key={resource}>
            {resource}: {empire.resources[resource]}
          </li>
        ))}
      </ul>
    </div>
  );
};
