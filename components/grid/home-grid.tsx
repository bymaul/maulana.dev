import GridLayout from '@/components/grid/layout';
import { getGridItems, getLayouts } from '@/config/grid';

export default function HomeGrid() {
  return (
    <GridLayout layouts={getLayouts()}>
      {getGridItems().map(({ i, component: Widget }) => (
        <div key={i} id={i}>
          <Widget />
        </div>
      ))}
    </GridLayout>
  );
}
