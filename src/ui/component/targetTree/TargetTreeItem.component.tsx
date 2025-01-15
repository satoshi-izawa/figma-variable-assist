
interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetItem;
}

export const TargetTreeItemComponent = (props: Props) => {
  const { item, map } = props;
  return <div>
    <div className="name">　{item.target.name}</div>
    {item.children.map(c => {
      const child = map[c];
      return <TargetTreeItemComponent item={child} map={map} key={c} />
    })}
  </div>
}
