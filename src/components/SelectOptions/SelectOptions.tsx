//@ts-ignore
import styles from "./SelectOptions.module.css";

interface sortingSelectProps {
  name: string;
  value: string;
  text: string;
  optionsArray: { value: string; text: string }[];
  setSort: (value: string) => void;
  classname?: string;
}

const SortingSelect = (props: sortingSelectProps) => {
  const { name, value, text, optionsArray, setSort, classname } = props;

  return (
    <select
      name={name}
      className={`${styles.select} ${classname}`}
      value={value}
      onChange={(event) => setSort(event.target.value)}
    >
      <option value="none" disabled>
        {text}
      </option>
      {optionsArray.map((optionObj) => (
        <option value={optionObj.value} key={optionObj.value}>
          {optionObj.text}
        </option>
      ))}
    </select>
  );
};
export default SortingSelect;
