import { IUser, IUsersCounter } from "./types";

function getUsersCounter(users: IUser[], usersCounter: IUsersCounter, setUsersCounter: (usersCounter: IUsersCounter) => void) {
  const total = users?.length;
  const fromEleven = users?.filter(
    (user) => user.dob.age >= 11 && user.dob.age <= 20
  ).length;
  const fromTwentyOne = users?.filter(
    (user) => user.dob.age >= 21 && user.dob.age <= 30
  ).length;
  const fromThirtyOne = users?.filter(
    (user) => user.dob.age >= 31 && user.dob.age <= 40
  ).length;
  const fromFortyOne = users?.filter(
    (user) => user.dob.age >= 41 && user.dob.age <= 50
  ).length;
  const fromFiftyOne = users?.filter((user) => user.dob.age >= 51).length;
  const male = users?.filter((user) => user.gender === "male").length;
  const female = users?.filter((user) => user.gender === "female").length;

  setUsersCounter({
    ...usersCounter,
    total,
    fromEleven,
    fromTwentyOne,
    fromThirtyOne,
    fromFortyOne,
    fromFiftyOne,
    male,
    female,
  });
}

export default getUsersCounter;
