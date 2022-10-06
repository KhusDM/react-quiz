import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function fetchQuizzes() {
    return async dispatch => {
        try {
            dispatch(fetchQuizzesStart());

            const response = await axios.get('/quizzes.json');
            const quizzes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                });
            });

            dispatch(fetchQuizzesSuccess(quizzes));
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        try {
            dispatch(fetchQuizzesStart());

            const response = await axios.get(`/quizzes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }

                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    };
}

function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    };
}

function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    };
}

function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    };
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}