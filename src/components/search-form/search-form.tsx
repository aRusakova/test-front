import styles from "./search-form.module.scss";
import { Formik, Form, Field } from "formik";
import RefreshButton from "../refresh-button/refresh-button.tsx";
import { IUser } from "../../utils/types.ts";
import searchUser from "../../utils/searchUser.ts";

interface ISearchFormProps {
  setFilteredUsers: (newList: IUser[]) => void;
  users?: IUser[],
  refetch: () => void,
}

export interface IFormValues {
  [name: string]: string;
}

function SearchForm({ setFilteredUsers, users, refetch }: ISearchFormProps): JSX.Element {

  const submit = (values: IFormValues) => {
    searchUser(values.search, setFilteredUsers, users);
  };

  const refreshUsers = async (values: IFormValues) => {
    await refetch();
    values.search = "";
  };

  return (
    <>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={submit}
        onReset={refreshUsers}
      >
        {({ handleReset, values }) => (
          <Form className={styles.form} onReset={handleReset}>
            <Field
              placeholder="Search"
              className={styles.field}
              name="search"
              type="text"
            />
            <RefreshButton refreshUsers={refreshUsers} values={values} />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SearchForm;
