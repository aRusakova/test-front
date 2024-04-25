import { useMemo } from "react";
import { IUser } from "../utils/types";
import { groupBy } from 'lodash-es';

const getGroupByAge = (age: number) => Math.min(Math.floor((age - 1) / 10), 5);

export const useUsersCounter = (users?: IUser[] | null) => {
  return useMemo(() => {
    const total = users?.length ?? 0;
    const genderGroup = groupBy(users, (user) => user.gender);
    const ageGroup = groupBy(users, (user) => getGroupByAge(user.dob.age));

    console.log(ageGroup)

    return {
      label: `${total} Users`,
      groups: [{
        label: 'Age Groups',
        list: [
          {
            label: '11 to 20',
            text: `${ageGroup[1]?.length ?? 0} users`,
          },
          {
            label: '21 to 30',
            text: `${ageGroup[2]?.length ?? 0} users`,
          },
          {
            label: '31 to 40',
            text: `${ageGroup[3]?.length ?? 0} users`,
          },
          {
            label: '41 to 50',
            text: `${ageGroup[4]?.length ?? 0} users`,
          },
          {
            label: '51+',
            text: `${ageGroup[5]?.length ?? 0} users`,
          },
        ],
      }, {
        label: 'Gender Groups',
        list: [         
          {
            label: 'Male',
            text: `${genderGroup['male']?.length ?? 0} users`,
          },
          {
            label: 'Female',
            text: `${genderGroup['female']?.length ?? 0} users`,
          },
        ]
      }],
    };
  }, [users]);
}
