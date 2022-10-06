import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Routes, Route} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {Navigate} from "react-router-dom";
import {authLogin} from "./store/actions/authActionCreator";

function App(props) {
    props.authLogin();

    let routes;
    if (props.isAuthenticated) {
        routes = (
            <Routes>
                <Route path="/quiz-creator" element={<QuizCreator/>}/>
                <Route path="/quiz/:id" element={<Quiz/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path="/" element={<QuizList/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/quiz/:id" element={<Quiz/>}/>
                <Route path="/" element={<QuizList/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        );
    }

    return (
        <Layout>
            {routes}
        </Layout>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.authReducer.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authLogin: () => dispatch(authLogin())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
