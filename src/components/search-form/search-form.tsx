import styles from "./search-form.module.scss";
import { Formik, Form, Field } from "formik";
import { useAppDispatch } from "../../hooks/store";
import { loadUsers } from "../../services/users/actions";
import RefreshButton from '../refresh-button/refresh-button.tsx';
import { searchUser } from "../../services/users/reducer.ts";

export interface IFormValues {
  [name: string]: string;
}

function SearchForm(): JSX.Element {

  const dispatch = useAppDispatch();

  const submit = (values: IFormValues) => {
    dispatch(searchUser(values.search));
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
