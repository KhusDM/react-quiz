import {useNavigate, useParams, useLocation} from "react-router-dom";

const WithRouter = WrappedComponent => props => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
            location={location}
        />
    );
};

export default WithRouter;