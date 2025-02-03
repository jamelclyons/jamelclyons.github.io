import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import {
  getAccount,
  getOrganizationDetailsList,
  getRepoDetailsList,
  getSocialAccounts,
} from '@/controllers/githubSlice';
import { getOrganizationData } from '@/controllers/databaseSlice';

import Organization from '@/model/Organization';

interface OrganizationState {
  organizationLoading: boolean;
  organizationStatusCode: string;
  organizationError: Error | null;
  organizationErrorMessage: string;
  organizationDataObject: Record<string, any> | null;
}

const initialState: OrganizationState = {
  organizationLoading: false,
  organizationStatusCode: '',
  organizationError: null,
  organizationErrorMessage: '',
  organizationDataObject: null,
};

export const getOrganization = createAsyncThunk(
  'user/getUser',
  async (url: string, thunkAPI) => {
    try {
      const organization = new Organization();

      let repos = null;

      const organizationResponse = await thunkAPI.dispatch(
        getOrganizationDetailsList(url)
      );

      if (getOrganizationDetailsList.fulfilled.match(organizationResponse) && organizationResponse.payload) {
        organization.fromGitHub(organizationResponse.payload);
      }

      const repoResponse = await thunkAPI.dispatch(getRepoDetailsList());

      if (
        getRepoDetailsList.fulfilled.match(repoResponse) &&
        repoResponse.payload
      ) {
        repos = repoResponse.payload;
      }

    //   const contactsResponse = await thunkAPI.dispatch(
    //     getSocialAccounts(organization.id)
    //   );

    //   if (
    //     getSocialAccounts.fulfilled.match(contactsResponse) &&
    //     contactsResponse.payload
    //   ) {
    //     organization.setContactMethods(contactsResponse.payload);
    //   }

      const databaseResponse = await thunkAPI.dispatch(getOrganizationData(organization.id));

      if (
        getOrganizationData.fulfilled.match(databaseResponse) &&
        databaseResponse.payload
      ) {
        organization.fromDB(databaseResponse.payload);
      }

      return { ...organization.toObject(), repos };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

const organizationSliceOptions: CreateSliceOptions<OrganizationState> = {
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.organizationLoading = false;
        state.organizationErrorMessage = '';
        state.organizationError = null;
        state.organizationDataObject = action.payload;
      })
      .addMatcher(isAnyOf(getOrganization.pending), (state) => {
        state.organizationLoading = true;
        state.organizationErrorMessage = '';
        state.organizationError = null;
      })
      .addMatcher(isAnyOf(getOrganization.rejected), (state, action) => {
        state.organizationLoading = false;
        state.organizationErrorMessage = action.error.message || '';
        state.organizationError = action.error as Error;
      });
  },
};

export const organizationSlice = createSlice(organizationSliceOptions);

export default organizationSlice;
