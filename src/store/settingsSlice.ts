import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDatabase, ref, child, get } from "firebase/database";

interface Settings {
	mainImage: string
	heroText: string
	logo: string
	logoDarkTheme: string
	phone: string
	adress: string
	adressLink: string
	email: string
	telegram: string
	instagram: string
	viber: string
	aboutText: string
	aboutImage: string
}

interface SettingsState {
  settings: Settings;
  status: "loading" | "resolved" | null;
  error: any;
}

export const fetchSettings = createAsyncThunk<
  Settings,
  void,
  { rejectValue: { message: string } }
>("settings/fetchSettings", async (_, { rejectWithValue }) => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/mainsettings/`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    return rejectWithValue({ message: "Failed to fetch categories" });
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {},
    status: null,
    error: null,
  } as SettingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchSettings.fulfilled,
        (state, action: PayloadAction<Settings>) => {
          state.status = "resolved";
          state.settings = action.payload;
        }
      );
  },
});

export default settingsSlice.reducer;
