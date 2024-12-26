import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

interface ContactState {
  contactLoading: boolean;
  contactStatusCode: string;
  contactError: Error | null;
  contactErrorMessage: string;
  contactSuccessMessage: string;
}

const initialState: ContactState = {
  contactLoading: false,
  contactStatusCode: '',
  contactError: null,
  contactErrorMessage: '',
  contactSuccessMessage: '',
};

interface Email {
  page: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  msg: string;
}

export const sendEmail = createAsyncThunk<string, Email>(
  'contact/sendEmail',
  async ({ page, firstname, lastname, email, subject, msg }) => {
    try {
      const response = await fetch(`/wp-json/seven-tech/v1/email/${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstname: firstname,
          lastname: lastname,
          subject: subject,
          message: msg,
        }),
      });

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

const contactSliceOptions: CreateSliceOptions<ContactState> = {
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.contactLoading = true;
        state.contactStatusCode = '';
        state.contactError = null;
        state.contactErrorMessage = '';
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactStatusCode = '';
        state.contactError = null;
        state.contactErrorMessage = '';
        state.contactSuccessMessage = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactStatusCode = action.error.code || '';
        state.contactError = (action.error as Error) || null;
        state.contactErrorMessage = action.error.message || '';
      });
  },
};

export const contactSlice = createSlice(contactSliceOptions);

export default contactSlice;
