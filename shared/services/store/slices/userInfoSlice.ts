import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import http from "@/shared/services/http";

type UserDetails = {
  id: number;
  name: string;
  email: string;
}

interface UserInfoState {
  userId?: number | string;
  user: UserDetails | null,
  loading: boolean;
  error: string | null;
}

const initialState: UserInfoState = {
  userId: typeof window !== 'undefined' ? localStorage.getItem('userId') || undefined : undefined,
  user: null,
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk<
  UserDetails,
  undefined,
  { rejectValue: string }
>(
  'userInfo/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get('/users/profile');
      return response?.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(err) {
      return rejectWithValue('Could not load user info');
    }
  }
 )


const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserDetails>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
  }
});

export const { setUserId } = userInfoSlice.actions;
export default userInfoSlice.reducer;
