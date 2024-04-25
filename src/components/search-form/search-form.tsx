import styles from "./search-form.module.scss";
import { useFormik } from "formik";
import RefreshButton from "../refresh-button/refresh-button.tsx";

interface ISearchFormProps {
  setSearch: (search: string) => void;
  refetch: () => void,
}

export interface IFormValues {
  search: string;
}

function SearchForm({ setSearch, refetch }: ISearchFormProps): JSX.Element {
  const { values, handleReset, handleSubmit, handleChange } = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: values => {
      setSearch(values.search);
    },
    onReset: () => {
      setSearch('');
      refetch();
    },
  });
  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
       <input
         placeholder="Search"
         className={styles.field}
         name="search"
         value={values.search}
         onChange={handleChange}
         type="text"
       />
       <RefreshButton />
     </form>
  );
}

export default SearchForm;
