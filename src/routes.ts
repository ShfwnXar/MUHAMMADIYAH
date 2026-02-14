import { createBrowserRouter } from "react-router-dom";
import LoginPeserta from './pages/LoginPeserta';
import LoginAdmin from './pages/LoginAdmin';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CompleteRegistration from './pages/CompleteRegistration';
import AdminDashboard from './pages/admin/AdminDashboard';
import DocumentValidation from './pages/admin/DocumentValidation';
import ApprovedParticipants from './pages/admin/ApprovedParticipants';
import RejectedDocuments from './pages/admin/RejectedDocuments';
import CompetitionResults from './pages/admin/CompetitionResults';
import StageSettings from './pages/admin/StageSettings';
import DownloadData from './pages/admin/DownloadData';
import TrackingStatus from './pages/TrackingStatus';
import Step1 from './pages/registration/Step1';
import Step2 from './pages/registration/Step2';
import Step3 from './pages/registration/Step3';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPeserta,
  },
  {
    path: '/login',
    Component: LoginPeserta,
  },
  {
    path: '/participant-login',
    Component: LoginPeserta,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/admin',
    Component: LoginAdmin,
  },
  {
    path: '/admin-login',
    Component: LoginAdmin,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/complete-registration',
    Component: CompleteRegistration,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboard,
  },
  {
    path: '/admin/validation',
    Component: DocumentValidation,
  },
  {
    path: '/admin/approved',
    Component: ApprovedParticipants,
  },
  {
    path: '/admin/rejected',
    Component: RejectedDocuments,
  },
  {
    path: '/admin/competition-results',
    Component: CompetitionResults,
  },
  {
    path: '/admin/stage-settings',
    Component: StageSettings,
  },
  {
    path: '/admin/download-data',
    Component: DownloadData,
  },
  {
    path: '/tracking',
    Component: TrackingStatus,
  },
  {
    path: '/registration/step-1',
    Component: Step1,
  },
  {
    path: '/registration/step-2',
    Component: Step2,
  },
  {
    path: '/registration/step-3',
    Component: Step3,
  },
]);