import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import db from '../services/firebase/config';

import { collection, getDocs } from "firebase/firestore";

const initialState = {
  portfolioLoading: false,
  portfolioError: '',
  portfolioErrorMessage: '',
  portfolioStatusCode: '',
  portfolio: '',
};

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "portfolio"));

    let portfolio = [];

    querySnapshot.forEach((doc) => {
      portfolio.push(doc.data());
    });
    
    return portfolio;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getPortfolioProjectsByUser = createAsyncThunk('portfolio/getPortfolioProjectsByUser', async (nicename) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/portfolio/v1/projects/user/${nicename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getPortfolioProjectsByTaxonomy = createAsyncThunk('portfolio/getPortfolioProjectsByTaxonomy', async (taxonomy) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/portfolio/v1/projects/taxonomies/${taxonomy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const getPortfolioProjectsWithTerm = createAsyncThunk('portfolio/getPortfolioProjectsWithTerm', async ({ taxonomy, term }) => {
  try {
    const response = await fetch(`/wp-json/seven-tech/portfolio/v1/projects/taxonomies/${taxonomy}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        term: term
      })
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(
        getPortfolio.fulfilled,
        getPortfolioProjectsByUser.fulfilled,
        getPortfolioProjectsByTaxonomy.fulfilled,
        getPortfolioProjectsWithTerm.fulfilled
      ), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = '';
        state.portfolioErrorMessage = action.payload.errorMessage;
        state.portfolioStatusCode = action.payload.statusCode;
        state.portfolio = action.payload;
      })
      .addMatcher(isAnyOf(
        getPortfolio.pending,
        getPortfolioProjectsByUser.pending,
        getPortfolioProjectsByTaxonomy.pending,
        getPortfolioProjectsWithTerm.pending
      ), (state) => {
        state.portfolioLoading = true;
        state.portfolioError = '';
        state.portfolioErrorMessage = '';
        state.portfolioStatusCode = '';
      })
      .addMatcher(isAnyOf(
        getPortfolio.rejected,
        getPortfolioProjectsByUser.rejected,
        getPortfolioProjectsByTaxonomy.rejected,
        getPortfolioProjectsWithTerm.rejected
      ), (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.error;
        state.portfolioErrorMessage = action.error.message;
        state.portfolioStatusCode = action.error.code;
      })
  }
})

export default portfolioSlice;
