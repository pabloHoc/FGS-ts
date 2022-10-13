import { useContext, useState } from 'react';
import { EntityId } from '../../game/entities';
import { Region } from '../../game/entities/region';
import { selectRegion } from '../../game/events/select-region';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

interface RegionItemProps {
  id: EntityId;
  name: string;
  onClick: (id: EntityId) => void;
}

const RegionItem = ({ id, name, onClick }: RegionItemProps) => (
  <li onClick={() => onClick(id)}>{name}</li>
);

export const RegionsList = () => {
  const game = useContext(GameCtx);
  const [regions, setRegions] = useState<Region[]>(
    game.entities.getAll<Region>('REGION')
  );

  const handleTurnStarted = () => {
    setRegions(game.entities.getAll<Region>('REGION'));
  };

  useListener('START_TURN', handleTurnStarted);

  const handleRegionClick = (id: EntityId) => {
    game.events.dispatch(selectRegion(id));
  };

  return (
    <ul>
      {regions.map((region) => (
        <RegionItem
          key={region.id}
          id={region.id}
          name={region.name}
          onClick={handleRegionClick}
        />
      ))}
    </ul>
  );
};
