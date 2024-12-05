import { createContext, useContext } from "react";
import TaskStore from "./taskStore";

interface Store {
  taskStore: TaskStore;
}

export const store: Store = {
  taskStore: new TaskStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
