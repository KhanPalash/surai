import { Drum, Guitar, Mic, Waves } from 'lucide-react';

const iconMap = {
  Drums: Drum,
  Bass: Waves,
  Vocals: Mic,
  Guitar: Guitar,
  default: Waves,
};

export const getInstrumentIcon = (instrumentName) => {
  return iconMap[instrumentName] || iconMap.default;
};
