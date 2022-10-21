import React from 'react'
import SignUp from './Login/SignUp'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashBoard from './Dashboard/DashBoard'
import LogIn from './Login/LogIn'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import ForgotPassword from './Login/ForgotPassword'
import Home from './Home/Home'
import HomeLogIn from './Home/HomeLogIn'
import Control from './Control/Control'
import HomeLogInAdmin from './Home/HomeLogInAdmin'
import HomeLogInIn from './Home/HomeLogInIn'
import 'boxicons'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'  
import DashBoardAdmin from './Dashboard/DashboardAdmin'
import AddMember from './AddMember/AddMember'
import ControlAdmin from './Control/ControlAdmin'
import AddMemberAdmin from './AddMember/AddMemberAdmin'
import Streaming from './Stream/stream'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/login' component={LogIn}></Route>
            {/* <PrivateRoute path='/update-profile' component={UpdateProfile} /> */}
            <Route path='/forgotpassword' component={ForgotPassword}></Route>
            <PrivateRoute
              exact
              path='/control'
              component={Control}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/controlAdmin'
              component={ControlAdmin}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/addMember'
              component={AddMember}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/addMemberAdmin'
              component={AddMemberAdmin}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/dashboard'
              component={DashBoard}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/HomeLogIn'
              component={HomeLogIn}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/HomeLogInAdmin'
              component={HomeLogInAdmin}
            ></PrivateRoute>
            {/* <PrivateRoute
                exact
                path='/HomeLogInAdmin'
                component={HomeLogInAdmin}
              ></PrivateRoute> */}
            <PrivateRoute
              exact
              path='/dashboardAdmin'
              component={DashBoardAdmin}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/addMember'
              component={AddMember}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path='/stream'
              component={Streaming}
            ></PrivateRoute>
            <Route path='/' component={Home}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
