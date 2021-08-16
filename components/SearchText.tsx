import { useEffect, useReducer } from "react";
import { combineLatest, from, of, Subject } from "rxjs";
import {
  catchError,
  debounce,
  debounceTime,
  map,
  switchMap,
  tap,
} from "rxjs/operators";

import { firebase } from "../firebase";
import { searchWorkouts$ } from "../redux/epics/util/searchWorkouts$";
import { Workout } from "../types";
import { Tag } from "../types/Tag";
import { removeDuplicates } from "../utils/removeDuplicates";
import { TextInput } from "./TextInput";

const searchInput$ = new Subject<string>();
const searchTags$ = new Subject<Tag[]>();

type SearchState = {
  input: string;
  result: Workout[];
  isLoading: boolean;
  error: string | undefined;
};

const DEFAULT_SEARCH_STATE: SearchState = {
  input: "",
  result: [],
  isLoading: false,
  error: undefined,
};

type SearchAction =
  | { type: "INPUT_CHANGE"; payload: string }
  | { type: "BEGIN_SEARCH" }
  | { type: "END_SEARCH"; payload: Workout[] }
  | { type: "FAILED_SEARCH"; payload: string };

export const SearchText = () => {
  const [search, setSearch] = useReducer(searchReducer, {
    ...DEFAULT_SEARCH_STATE,
  });

  const handleInput = (input: string) => {
    setSearch({ type: "INPUT_CHANGE", payload: input });
    searchInput$.next(input.trim());
  };

  useEffect(() => {
    const searchInputSubscription$ = searchInput$
      .pipe(
        debounceTime(300),
        tap(() => setSearch({ type: "BEGIN_SEARCH" })),
        tap(() => console.log("Start Search")),
        switchMap((input) => searchWorkouts$(input)),
        tap((results) => console.log("RESULTS: ", results)),
        tap((searchResult) =>
          setSearch({ type: "END_SEARCH", payload: searchResult })
        ),
        catchError((err) => {
          console.error("Error", err);
          return of(setSearch({ type: "FAILED_SEARCH", payload: "ERRRORR" }));
        })
      )
      .subscribe();

    return () => searchInputSubscription$.unsubscribe();
  }, []);

  return (
    <div>
      <TextInput
        id="workout-search"
        placeholder="core"
        value={search.input}
        onChange={handleInput}
        label="Search Workouts"
        error={search.error}
        isOutlined
      />
      <div>
        {search.result.map((workout) => (
          <div key={workout.id}>{workout.name}</div>
        ))}
      </div>
    </div>
  );
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        input: action.payload,
      };
    case "BEGIN_SEARCH":
      return {
        ...state,
        isLoading: true,
      };
    case "END_SEARCH":
      return {
        ...state,
        result: action.payload,
        isLoading: false,
        error: undefined,
      };
    case "FAILED_SEARCH":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

