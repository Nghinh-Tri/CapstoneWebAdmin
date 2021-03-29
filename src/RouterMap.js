import Register from "./screen/create-user/Register"
import ProjectDetail from "./screen/confirm/ProjectDetail"
import ListCandidate from "./screen/confirm/ListCandidate"
import ConfirmPage from "./screen/confirm/ConfirmPage"
import Dashboard from "./screen/dashboard/Dashboard"
import Project from "./screen/project/Project"
import Profile from "./screen/profile/Profile"
import Position from "./screen/position/Position"
import CreatePosition from "./screen/position/CreatePosition"
import Skill from "./screen/skill/Skill"
import CreateSkills from "./screen/skill/CreateSkills"
import Certification from "./screen/certification/Certification"
import CreateCertification from "./screen/certification/CreateCertification"


const route = [
    {
        path: "/",
        exact: true,
        main: () => <Dashboard />
    },
    {
        path: "/project",
        exact: true,
        main: () => <Project />
    },
    {
        path: '/project/detail/:id',
        exact: true,
        main: ({ match }) => <Profile match={match} />
    },
    {
        path: "/project/candidateList/:id",
        exact: true,
        main: ({ match }) => <ListCandidate match={match} />
    },
    {
        path: "/project/confirm/:id",
        exact: true,
        main: ({ match }) => <ProjectDetail match={match} />
    },

    {
        path: "/confirmPage",
        exact: true,
        main: ({ match }) => <ConfirmPage match={match} />

    },
    {
        path: "/register",
        exact: true,
        main: () => <Register />
    },
    {
        path: "/position",
        exact: true,
        main: () => <Position />
    },
    {
        path: "/position/create",
        exact: true,
        main: () => <CreatePosition />
    },
    {
        path: "/skill",
        exact: true,
        main: () => <Skill />
    },
    {
        path: "/skill/create",
        exact: true,
        main: () => <CreateSkills />
    },
    {
        path: "/certification",
        exact: true,
        main: () => <Certification />
    },
    {
        path: "/certification/create",
        exact: true,
        main: () => <CreateCertification />
    },
]

export default route