import GridItem from '@/components/shared/grid/item';
import GridLayout from '@/components/shared/grid/layout';
import { getGridItems, getLayouts } from '@/config/grid';

export default function HomeGrid() {
  const gridItems = getGridItems();

  return (
    <GridLayout layouts={getLayouts()}>
      {gridItems.map((item) => (
        <GridItem key={item.i} id={item.i} component={item.component} />
      ))}
    </GridLayout>
  );
}
