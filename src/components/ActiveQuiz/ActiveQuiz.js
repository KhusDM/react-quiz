import React from "react";
import classes from './ActiveQuiz.module.css';
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = (props) => {
    return (
        <div className={classes['ActiveQuiz']}>
            <p className={classes['Question']}>
               <span>
                   <strong>{props.answerNumber}.</strong>&nbsp;{props.question}
               </span>

                <small>{props.answerNumber} из {props.quizLenght}</small>
            </p>

            <AnswerList answers={props.answers}
                        state={props.state}
                        onAnswerClick={props.onAnswerClick}
            />
        </div>
    );
}

export default ActiveQuiz;