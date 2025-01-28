import { style } from './TargetTreePreview.style';

interface Props {
  isPreviewOnly?: boolean
  value: SerializableValue;
}

/** @package */
export const PreviewComponent = (props: Props) => {
  const { value, isPreviewOnly } = props;
  const colorValue = findColorValue(value);
  return colorValue ? (
    <div className={style.root}>
      <div
        className={style.preview}
        style={{ backgroundColor: colorValue }}></div>
      {!isPreviewOnly ? <span>{colorValue}</span> : null}
    </div>
  ) : null;
};

const findColorValue = (value: SerializableValue): string | null =>
  value?.type === 'COLOR'
    ? value.hex
    : value?.type === 'ALIAS'
      ? findColorValue(value.reference)
      : null;
