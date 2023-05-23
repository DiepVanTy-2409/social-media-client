import { HomePage, ProfilePage, NotFound } from "./Pages"
export const routes = [
    { path: '/', element: <HomePage /> },
    { path: 'profile/:userId', element: <ProfilePage /> },
    { path: 'notifications', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'community', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'marketplace', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'alola-event', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'news-feed', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'user/:UserId', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: 'group/:GroupId', element: <h1>Sẽ sớm đc cập nhật!</h1> },
    { path: '*', element: <NotFound /> },
]