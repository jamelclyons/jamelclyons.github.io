import {
  createSlice,
  createAsyncThunk,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { collection, doc, getDoc } from 'firebase/firestore';

import { db } from '../services/firebase/config';

import Model from '../model/Model';

export class ContactPage extends Model {
  title: string;
  message: string;

  constructor(data: Record<string, any> = {}) {
    super();

    this.title = data?.title;
    this.message = data?.message;
  }
}

interface ContactState {
  contactLoading: boolean;
  contactError: Error | null;
  contactErrorMessage: string;
  contactSuccessMessage: string;
  contactPage: Record<string, any> | null;
}

const initialState: ContactState = {
  contactLoading: false,
  contactError: null,
  contactErrorMessage: '',
  contactSuccessMessage: '',
  contactPage: null,
};

interface Email {
  page: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  msg: string;
}

export const sendEmail = createAsyncThunk<string, Record<string, any>>(
  'contact/sendEmail',
  async (data) => {
    try {
      console.log(data);
      // const response = await fetch(`/wp-json/seven-tech/v1/email/${page}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: email,
      //     firstname: firstname,
      //     lastname: lastname,
      //     subject: subject,
      //     message: msg,
      //   }),
      // });

      // const responseData = await response.json();

      // return responseData;
      return 'Success';
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getContactPageContent = createAsyncThunk(
  'about/getContactPageContent',
  async () => {
    try {
      const contactCollection = collection(db, 'content');
      const docRef = doc(contactCollection, 'contact');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Contact page content could not be found.');
      }

      return new ContactPage(docSnap.data()).toObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
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
        state.contactError = null;
        state.contactErrorMessage = '';
      })
      .addCase(getContactPageContent.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = null;
        state.contactErrorMessage = '';
        state.contactPage = action.payload;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = null;
        state.contactErrorMessage = '';
        state.contactSuccessMessage = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactError = (action.error as Error) || null;
        state.contactErrorMessage = action.error.message || '';
      });
  },
};

export const contactSlice = createSlice(contactSliceOptions);

export default contactSlice;
