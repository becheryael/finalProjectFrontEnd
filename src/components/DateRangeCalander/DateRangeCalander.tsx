import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//@ts-ignore
import styles from "./DateRangeCalander.module.css";

interface DateRangeCalanderProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
  getAllRequests: (start: string, end: string) => void;
  setIsShowCalendar: (value: boolean) => void;
}

const DateRangeCalander = (props: DateRangeCalanderProps) => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getAllRequests,
    setIsShowCalendar
  } = props;

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start) {
      start.setHours(0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilter = () => {
    const startDateString = String(startDate);
    const endDateString = String(endDate);

    getAllRequests(startDateString, endDateString);
    setStartDate(null);
    setEndDate(null);
    setIsShowCalendar(false);
  };

  return (
    <div className={styles["calender-contianer"]}>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        maxDate={new Date()}
      />
      {endDate && startDate && (
        <button className={styles["filter-btn"]} onClick={handleFilter}>
          Filter
        </button>
      )}
    </div>
  );
};

export default DateRangeCalander;
