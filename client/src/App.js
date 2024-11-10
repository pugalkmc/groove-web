import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"
import AdminConsole from "./components/admin/AdminConsole";
import ProjectSource from "./components/admin/sidenav/ProjectSource";
import ProjectDetails from "./components/admin/sidenav/ProjectDetails";
import ExpertHelp from "./components/admin/sidenav/ExpertHelp";
import BotControls from "./components/admin/sidenav/BotControls";
import AccountDashboard from "./components/admin/sidenav/AccountDashboard";
import FAQ from "./components/admin/sidenav/FAQ";
import FaqForm from "./components/super/FaqForm";
import PrivateRoute from "./PrivateRoute";
import BotSetup from "./components/admin/sidenav/BotSetup";
import FeedbackForm from "./components/home/FeedbackForm";
import ChatBotPlayground from "./components/admin/sidenav/ChatBotPlayground";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/console" element={<PrivateRoute/>}>
          <Route path="" element={<AdminConsole/>}>
            <Route path="project" element={<ProjectDetails/>}/>
            <Route path="source" element={<ProjectSource/>}/>
            <Route path="control" element={<BotControls/>}/>
            <Route path="expert" element={<ExpertHelp/>}/>
            <Route path="playground" element={<ChatBotPlayground/>} />
          </Route>
          <Route path="account" element={<AccountDashboard/>}/>
          <Route path="setup" element={<BotSetup/>}/>
          <Route path="*" element={<AdminConsole/>}/>
        </Route>
        <Route path="feedback" element={<FeedbackForm/>}/>
        <Route path="/faq-form" element={<FaqForm/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App;
