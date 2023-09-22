import { writable } from "svelte/store";

export interface Timer {
  count: number;
  toggle:boolean;
  timerSet:number;
}

const initStore = () => {
  const initialTimer: Timer = {
    count: 0,
    toggle:false,
    timerSet:0
  };

  const { subscribe, set, update } = writable(initialTimer);

  return {
    subscribe,
    switchCounter: (count: number) => {
      update((state) => ({
        ...state,
        count: count *60,
      }));
    },
    setTimer:(timer:number)=>{
        update((state)=>({
            ...state,
            timerSet:timer
        }))
    },
    setToggle:(toggle:boolean)=>{
        update((state)=>({
            ...state,
            toggle:toggle,
        }))
    },
    startTimer:()=>{
        update((state)=>{
          if(state.timerSet === 0){
            const intervalId = setInterval(()=>{
              if(state.count > 0){
                update((s)=>({...s, count:s.count - 1}));
              }else{
                clearInterval(intervalId);
                return {...state, timerSet:0, toggle:false};
              }
            },1000);
            return {...state, timerSet:intervalId, toggle:true};
          }
          return state
        })
    },
    stopTimer:()=>{
        update((state)=>{
          if(state.timerSet !== 0){
            clearInterval(state.timerSet);
            return {...state, timerSet:0, toggle:false};
          }
          return state;
        })
    },
    resetTimer:()=>{
       update((state)=>{
        clearInterval(state.timerSet);
        return {...state, count:0,timerSet:0, toggle:false};
       })
    },
    resetCounter:()=>{
        update((state)=>({
            ...state,
            count:0
        }))
    }
  };
};

export const timer = initStore();
