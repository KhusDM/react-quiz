import React, {useState} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым'
    }, {required: true});
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

const QuizCreator = (props) => {
    const [state, setState] = useState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    });
    const submitHandler = (event) => {
        event.preventDefault();
    }
    const addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = state.quiz.concat();
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = state.formControls;
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: state.rightAnswerId,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        quiz.push(questionItem);
        setState({
            ...state,
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    };
    const createQuizHandler = (event) => {
        event.preventDefault();
        
        console.log(state.quiz);
    };
    const onChangeHandler = (value, controlName) => {
        const formControls = {...state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        setState({
            ...state,
            formControls: formControls,
            isFormValid: validateForm(formControls)
        });
    };
    const renderControls = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => onChangeHandler(event.target.value, controlName)}
                    />

                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            );
        });
    };
    const selectChangeHandler = (event) => {
        setState({
            ...state,
            rightAnswerId: +event.target.value
        });
    };
    const select = <Select
        label="Выберите правильный ответ"
        value={state.rightAnswerId}
        onChange={selectChangeHandler}
        options={[
            {text: '1', value: 1},
            {text: '2', value: 2},
            {text: '3', value: 3},
            {text: '4', value: 4},
        ]}
    />

    return (
        <div className={classes['QuizCreator']}>
            <div>
                <h1>Создание теста</h1>

                <form onSubmit={submitHandler}>

                    {renderControls()}

                    {select}

                    <Button type="primary" onClick={addQuestionHandler} disabled={!state.isFormValid}>
                        Добавить вопрос
                    </Button>

                    <Button type="success" onClick={createQuizHandler} disabled={!state.quiz.length}>
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default QuizCreator;