import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../../service";

const initialState = {
  contactList: [],
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
  error: null
}

export const getContacts = createAsyncThunk('contact/getContacts', async (args, { rejectWithValue }) => {
  try {
    const contancts = await service.get()
    return contancts
  } catch (e) {
    console.error(e.message);
    return rejectWithValue(e.message)
  }
});

export const putContacts = createAsyncThunk('contact/putContact', async ({ contact }, { dispatch, rejectWithValue }) => {
  try {
    console.log(contact)
    await service.put(contact);
    dispatch(getContacts());
  } catch (e) {
    console.error(e.message);
    return rejectWithValue(e.message);
  }
});

export const postContact = createAsyncThunk('contact/postContact', async ({ contact }, { dispatch, rejectWithValue }) => {
  try {
    await service.post(contact);
    dispatch(getContacts());
  } catch (e) {
    console.error(e.message);
    return rejectWithValue(e.message)
  }
})

export const deleteContact = createAsyncThunk('contact/deleteContact', async ({ id }, { dispatch, rejectWithValue }) => {
  try {
    await service.delete(id);
    dispatch(getContacts());
  } catch (e) {
    console.error(e.message);
    return rejectWithValue(e.message)
  }
})


const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // get contacts
    builder.addCase(getContacts.pending, (state) => {
      state.loading.get = true
      state.error = null;
    });
    builder.addCase(getContacts.fulfilled, (state, { payload }) => {
      state.loading.get = false;
      state.contactList = payload;
      state.error = null;
    });
    builder.addCase(getContacts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = 'Error get contacts'
    });

    // put contact
    builder.addCase(putContacts.pending, (state) => {
      state.loading.put = true;
      state.error = null;
    });
    builder.addCase(putContacts.fulfilled, (state) => {
      state.loading.put = false;
      state.error = null;
    });
    builder.addCase(putContacts.rejected, (state, { payload }) => {
      state.loading.put = false;
      state.error = "Error updating contact"
    });

    // delete contact
    builder.addCase(deleteContact.pending, (state) => {
      state.loading.delete = true;
      state.error = null;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.loading.delete = false;
      state.error = null;
    });
    builder.addCase(deleteContact.rejected, (state, { payload }) => {
      state.loading.delete = false;
      state.error = 'Error deleting contact'
    })

    //post contact
    builder.addCase(postContact.pending, (state) => {
      state.loading.post = true;
      state.error = null;
    });
    builder.addCase(postContact.fulfilled, (state) => {
      state.loading.post = false;
      state.error = null;
    });
    builder.addCase(postContact.rejected, (state, { payload }) => {
      state.loading.post = false;
      state.error = 'Error Adding contact'
    })
  }
});

export default contactSlice.reducer;
