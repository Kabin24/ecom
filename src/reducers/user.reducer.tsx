import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatSvc from "../services/chat.service";
import { IGetAllDataWithFilter } from "../contracts/https-contracts";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (query: IGetAllDataWithFilter) => {
    const response = await chatSvc.getRequest("/user", {
      params: {
        search: query?.search || null,
        page: query?.page || 1,
        limit: query?.limit || 20,
      },
    });

    return response;
  }
);

export type UserQueryType = {
  id: string;
};
export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (query: UserQueryType) => {
    const detail = await chatSvc.getRequest("/user/" + query.id);

    return detail.result.data;
  }
);

const UserSlicer = createSlice({
  name: "user",
  initialState: {
    userDetail: null,
    userList: [],
    userPagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPages: 1,
    },
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const payload = action.payload.result;

      state.userList =
        state.userList && state.userList.length > 0
          ? [...state.userList, ...payload.data]
          : payload.data;

      state.userPagination = {
        ...payload.options.pagination,
        totalPages: Math.ceil(
          payload.options.pagination.total / payload.options.pagination.limit
        ),
      };
    });
    builder.addCase(getAllUsers.rejected, (state, _action) => {
      state.userList = [];
      state.userPagination = {
        limit: 20,
        page: 1,
        total: 0,
        totalPages: 1,
      };
    });

    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });

    builder.addCase(getUserDetail.rejected, (state, _action) => {
      state.userDetail = null;
    });
  },
});

export const { setActiveUser } = UserSlicer.actions;
export default UserSlicer.reducer;
