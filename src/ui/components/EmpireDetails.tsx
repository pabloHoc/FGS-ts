import { useContext, useEffect, useState } from 'react';
import { Empire } from '../../game/entities/empire';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const EmpireDetails = () => {
  const game = useContext(GameCtx);
  const [empire, setEmpire] = useState<Empire>();

  const updateEmpire = () => {
    const playerEmpire = game.entities.empires.find(
      (empire) => empire.isPlayer
    );
    setEmpire(playerEmpire ? { ...playerEmpire } : undefined);
  };

  useEffect(updateEmpire, []);
  useListener('START_TURN', updateEmpire);
  useListener('UPDATE_RESOURCES', updateEmpire);

  if (!empire) return null;

  return (
    <div>
      <h3>EMPIRE {empire.name}</h3>
      <ul>
        {empire.resources.map((resource) => (
          <li key={resource.type}>
            {resource.type}: {resource.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
