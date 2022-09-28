import React, {Component} from "react";
import classes from "./QuizList.module.css";
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizzes} from "../../store/actions/actionCreators";

class QuizList extends Component {
    async componentDidMount() {
        this.props.fetchQuizzes();
    }

    render() {
        return (
            <div className={classes['QuizList']}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.props.state.loading && !this.props.state.quizzes.length
                            ? <Loader/>
                            : <ul>{this.renderQuizzes()}</ul>
                    }
                </div>
            </div>
        );
    }

    renderQuizzes() {
        return this.props.state.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        });
    };
}

function mapStateToProps(state) {
    return {
        state: state.quiz
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);