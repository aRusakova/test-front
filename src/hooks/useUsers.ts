import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../utils/users-api.ts";

import { searchUsers } from "../utils/searchUser.ts";


export const useUsers = (search?: string) => {
    const [deletedUsers, setDeletedUsers] = useState(new Set());
  
    const { data: allUsers, isFetching, isError, refetch: refetchQuery } = useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
    });
  
    const users = useMemo(() => {
        return searchUsers(allUsers, search)
            ?.filter((user) => !deletedUsers.has(user.login.md5))
    }, [allUsers, deletedUsers, search]);
  
    const deleteUser = useCallback((userId: string) => {
      setDeletedUsers((prev) => {
        prev.add(userId);
        return new Set(prev);
      });
    }, [setDeletedUsers]);
  

    const refetch = useCallback(() => {
      setDeletedUsers(new Set());
      return refetchQuery();
    }, [refetchQuery]);
  
    return { users, isFetching, isError, refetch, deleteUser }
  }