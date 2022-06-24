import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        isFinished: false,
        results: {},
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелённый', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Какого цвета небо?',
                rightAnswerId: 6,
                answers: [
                    {text: 'Чёрный', id: 5},
                    {text: 'Синий', id: 6},
                    {text: 'Красный', id: 7},
                    {text: 'Зелённый', id: 8},
                ]
            }
        ]
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            });

            const timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true});
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }

                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: []
        });
    }

    render() {
        return (
            <div className={classes['Quiz']}>
                <div className={classes['QuizWrapper']}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz results={this.state.results}
                                            quiz={this.state.quiz}
                                            onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz question={this.state.quiz[this.state.activeQuestion].question}
                                          answers={this.state.quiz[this.state.activeQuestion].answers}
                                          onAnswerClick={this.onAnswerClickHandler}
                                          quizLenght={this.state.quiz.length}
                                          answerNumber={this.state.activeQuestion + 1}
                                          state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz