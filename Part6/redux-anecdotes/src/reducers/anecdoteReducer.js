import { createSlice } from "@reduxjs/toolkit";
import {
  createAnecdote,
  fetchAnecdotes,
  modifyPost,
} from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    vote(state, action) {
      const targetId = action.payload;
      // when updating votes, seems like I cannot use ++ because that itself is counted as mutation of the state
      return state.map((anecdote) =>
        anecdote.id === targetId
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    newPost(state, action) {
      // if it directly mutates the state, there is no need to return the mutated state
      state.push(action.payload);
    },
    modifyAnecdote(state, action) {
      const newAnecdote = action.payload;
      // console.log(newAnecdote);
      return state.map((anecdote) =>
        anecdote.id === newAnecdote.id ? newAnecdote : anecdote
      );
    },
  },
});

export const { vote, newPost, setAnecdotes, modifyAnecdote } =
  anecdoteReducer.actions;
export default anecdoteReducer.reducer;

// async action creators - kind of combine making an async request and updating the store
export const initializeStore = () => {
  return async (dispatch) => {
    const initialState = await fetchAnecdotes();
    dispatch(setAnecdotes(initialState));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createAnecdote(content);
    dispatch(newPost(newAnecdote));
  };
};

export const changeAnecdote = (id, content) => {
  return async (dispatch) => {
    const modifiedAnecdote = await modifyPost(id, content);
    dispatch(modifyAnecdote(modifiedAnecdote));
  };
};

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// // action creators
// export const upVote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

// export const newPost = (content) => {
//   return {
//     type: "NEW POST",
//     payload: { content },
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE":
//       const updatedVotes = state.map((anecdote) => {
//         return anecdote.id === action.payload.id
//           ? // should put the ++ before the anecdote.votes because doing so will allow the value to be incremented before it is returned
//             { ...anecdote, votes: ++anecdote.votes }
//           : anecdote;
//       });
//       return updatedVotes;
//     case "NEW POST":
//       const newAnecdoteList = state.concat(asObject(action.payload.content));
//       return newAnecdoteList;
//     default:
//       return state;
//   }
// };

// export default reducer;
