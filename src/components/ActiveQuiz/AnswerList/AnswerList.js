import React from "react";
import classes from './AnswerList.module.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) => {
    return (
        <ul className={classes['AnswerList']}>
            {
                props.answers.map((answer, index) => {
                    return (
                        <AnswerItem key={index}
                                    state={props.state ? props.state[answer.id] : null}
                                    answer={answer}
                                    onAnswerClick={props.onAnswerClick}
                        />
                    );
                })
            }
        </ul>
    )
}

export default AnswerList;