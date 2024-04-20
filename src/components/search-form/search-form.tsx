import styles from "./search-form.module.scss";
import { Formik, Form, Field } from "formik";
import { useAppDispatch } from "../../hooks/store";
import { loadUsers } from "../../services/users/actions";
import RefreshButton from '../refresh-button/refresh-button.tsx';

interface ISearchFormProps {
  searchUser: (value: string) => void;
}

export interface IFormValues {
  [name: string]: string;
}

function SearchForm({searchUser}: ISearchFormProps): JSX.Element {

  const dispatch = useAppDispatch();

  const submit = (values: IFormValues) => {
    searchUser(values.search);
  };

  const refreshUsers = (values: IFormValues) => {
    dispatch(loadUsers());
    values.search = '';
  };

  return (
    <>
    <Formik
      initialValues={{ search: "" }}
      onSubmit={submit}
      onReset={refreshUsers}
    >
      {({handleReset, values}) => (
        <Form className={styles.form} onReset={handleReset}>
          <Field placeholder="Search" className={styles.field} name="search" type="text" />
          <RefreshButton refreshUsers={refreshUsers} values={values} />
        </Form>
      )}
    </Formik>
    
    </>
  );
}

export default SearchForm;
