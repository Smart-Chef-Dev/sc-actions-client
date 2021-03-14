import { useCallback, useEffect, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { addSeconds } from "date-fns";

import ScreenBlock from "components/screen-block";
import { Keys, getOrDefault } from "utils/localStorage";

const MAX_ATTEMPTS_COUNT = 3;
const MIN_ALLOW_INTERVAL = 10;
const MAX_LOCK_TIME = 86400;
const LOCK_TIMES = [30, 60, 120, 240, 360];
const INTERVAL_TIMEOUT = 1000;

export const useScreenBlock = () => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const { firstAttemptTime, lockAt, ...oldState } = getOrDefault(
      Keys.BLOCK_SCREEN,
      initial
    );
    return {
      ...oldState,
      firstAttemptTime: firstAttemptTime ? new Date(firstAttemptTime) : null,
      lockAt: lockAt ? new Date(lockAt) : null,
    };
  });
  const {
    attemptsCount,
    lockCount,
    lockAt,
    firstAttemptTime,
    remainingSeconds,
  } = state;

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem(Keys.BLOCK_SCREEN, JSON.stringify(state));
    };
  }, [state]);

  const attemptsWrapper = useCallback(() => {
    if (!attemptsCount) {
      dispatch({ type: actionTypes.SET_ATTEMPT_TIME });
    }

    dispatch({ type: actionTypes.INCREMENT_ATTEMPT });
  }, [attemptsCount]);

  const needLock = useMemo(() => {
    if (remainingSeconds) {
      return true;
    }

    const isAfterInterval =
      addSeconds(firstAttemptTime, MIN_ALLOW_INTERVAL) >= new Date();

    if (attemptsCount >= MAX_ATTEMPTS_COUNT && !isAfterInterval) {
      dispatch({ type: actionTypes.RESET_ATTEMPT });
    } else if (attemptsCount >= MAX_ATTEMPTS_COUNT && isAfterInterval) {
      dispatch({ type: actionTypes.ADD_LOCK });
      return true;
    }

    return false;
  }, [attemptsCount, firstAttemptTime, remainingSeconds]);

  useEffect(() => {
    let intervalId = null;

    if (needLock) {
      const lockTime = LOCK_TIMES[lockCount - 1] ?? MAX_LOCK_TIME;

      intervalId = setInterval(() => {
        const lockUntil = addSeconds(lockAt, lockTime).getTime();
        const currentTime = new Date().getTime();

        if (lockUntil <= currentTime) {
          dispatch({ type: actionTypes.RESET_ATTEMPT });
          clearInterval(intervalId);
        } else {
          dispatch({
            type: actionTypes.SET_REMAINING_SECONDS,
            payload: lockUntil - currentTime,
          });
        }
      }, INTERVAL_TIMEOUT);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [attemptsCount, lockAt, lockCount, needLock]);

  const renderScreenBlock = useCallback(() => {
    return needLock && remainingSeconds
      ? createPortal(
          <ScreenBlock remainingSeconds={remainingSeconds} />,
          document.body
        )
      : null;
  }, [needLock, remainingSeconds]);

  return {
    renderScreenBlock,

    attemptsWrapper,
  };
};

const actionTypes = {
  ADD_LOCK: "ADD_LOCK",
  RESET_ATTEMPT: "RESET_ATTEMPT",
  SET_ATTEMPT_TIME: "SET_ATTEMPT_TIME",
  INCREMENT_ATTEMPT: "INCREMENT_ATTEMPT",
  SET_REMAINING_SECONDS: "SET_REMAINING_SECONDS",
};

const initialState = {
  attemptsCount: 0,
  lockCount: 0,
  remainingSeconds: 0,
  firstAttemptTime: null,
  lockAt: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_ATTEMPT: {
      return {
        ...state,
        attemptsCount: state.attemptsCount + 1,
      };
    }
    case actionTypes.RESET_ATTEMPT: {
      return {
        ...state,
        attemptsCount: initialState.attemptsCount,
      };
    }
    case actionTypes.ADD_LOCK: {
      return {
        ...state,
        lockCount: state.lockCount + 1,
        lockAt: new Date(),
      };
    }
    case actionTypes.SET_ATTEMPT_TIME: {
      return {
        ...state,
        firstAttemptTime: new Date(),
      };
    }
    case actionTypes.SET_REMAINING_SECONDS: {
      return {
        ...state,
        remainingSeconds:
          action.payload <= INTERVAL_TIMEOUT ? 0 : action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
