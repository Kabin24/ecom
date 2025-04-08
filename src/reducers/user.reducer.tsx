import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatSvc from "../services/chat.service";
import { IGetAllDataWithFilter } from "../contracts/https-contracts";
import { IResponseType } from "../services/http.service";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (query: IGetAllDataWithFilter) => {
    try {
      //api call
      const response = await chatSvc.getRequest("/user", {
        params: {
          search: query?.search || null,
          page: query?.page || 1,
          limit: query?.limit || 20,
        },
      });

      console.log(response);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
);

const UserSlicer = createSlice({
  name: "user",
  initialState: {
    userDetail: {},
    userList: null,
    userPagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPages: 1,
    },
  },
  reducers: {
    sayHeloo: (state, action) => {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const payload = action.payload.result;
      state.userList = payload.data;
      state.userPagination = {
        ...payload.options.pagination,
        totalPages: Math.ceil(
          payload.options.pagination.tota / payload.options.pagination.limit
        ),
      };
    });
    builder.addCase(getAllUsers.rejected, (state, _action) => {
      state.userList = null;
      state.userPagination = {
        limit: 20,
        page: 1,
        total: 0,
        totalPages: 1,
      };
    });
  },
});

export const { sayHeloo } = UserSlicer.actions;
export default UserSlicer.reducer;
