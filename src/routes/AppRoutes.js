import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routeConfig';
import Loader from '../components/common/Loader';
import DashboardLayout from '../components/layout/DashboardLayout';

/* ── Lazy-loaded pages ─────────────────────────────────────── */
// Auth
const Login          = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword  = lazy(() => import('../pages/auth/ResetPassword'));

// Dashboard
const Dashboard      = lazy(() => import('../pages/dashboard/Dashboard'));

// News
const NewsList   = lazy(() => import('../pages/news/NewsList'));
const CreateNews = lazy(() => import('../pages/news/CreateNews'));
const EditNews   = lazy(() => import('../pages/news/EditNews'));
const ViewNews   = lazy(() => import('../pages/news/ViewNews'));

// Events
const EventsList    = lazy(() => import('../pages/events/EventsList'));
const CreateEvent   = lazy(() => import('../pages/events/CreateEvent'));
const EditEvent     = lazy(() => import('../pages/events/EditEvent'));
const ViewEvent     = lazy(() => import('../pages/events/ViewEvent'));

// Videos
const VideosList    = lazy(() => import('../pages/videos/VideosList'));
const UploadVideo   = lazy(() => import('../pages/videos/UploadVideo'));
const EditVideo     = lazy(() => import('../pages/videos/EditVideo'));
const ViewVideo     = lazy(() => import('../pages/videos/ViewVideo'));

// Gallery
const GalleryList    = lazy(() => import('../pages/gallery/GalleryList'));
const UploadImage    = lazy(() => import('../pages/gallery/UploadImage'));
const Albums         = lazy(() => import('../pages/gallery/Albums'));
const GalleryPreview = lazy(() => import('../pages/gallery/GalleryPreview'));

// Research
const ResearchList    = lazy(() => import('../pages/research/ResearchList'));
const CreateResearch  = lazy(() => import('../pages/research/CreateResearch'));
const EditResearch    = lazy(() => import('../pages/research/EditResearch'));
const ViewResearch    = lazy(() => import('../pages/research/ViewResearch'));

// Members
const Members            = lazy(() => import('../pages/members/Members'));
const MembershipRequests = lazy(() => import('../pages/members/MembershipRequests'));
const MemberProfile      = lazy(() => import('../pages/members/MemberProfile'));
const AddMember          = lazy(() => import('../pages/members/AddMember'));

// Resources
const Resources      = lazy(() => import('../pages/resources/Resources'));
const UploadResource = lazy(() => import('../pages/resources/UploadResource'));
const Categories     = lazy(() => import('../pages/resources/Categories'));

// Contact
const Messages       = lazy(() => import('../pages/contact/Messages'));
const MessageDetails = lazy(() => import('../pages/contact/MessageDetails'));

// Settings
const GeneralSettings  = lazy(() => import('../pages/settings/GeneralSettings'));
const SocialSettings   = lazy(() => import('../pages/settings/SocialSettings'));
const WebsiteSettings  = lazy(() => import('../pages/settings/WebsiteSettings'));
const ProfileSettings  = lazy(() => import('../pages/settings/ProfileSettings'));
const SecuritySettings = lazy(() => import('../pages/settings/SecuritySettings'));

// Errors
const NotFound    = lazy(() => import('../pages/errors/NotFound'));
const Unauthorized = lazy(() => import('../pages/errors/Unauthorized'));

/* ─────────────────────────────────────────────────────────── */

const AppRoutes = () => (
  <Suspense fallback={<Loader fullScreen />}>
    <Routes>
      {/* ── Public routes ── */}
      <Route path={ROUTES.LOGIN}           element={<Login />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD}  element={<ResetPassword />} />

      {/* ── Protected routes (wrapped in DashboardLayout) ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />

          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* News */}
          <Route path={ROUTES.NEWS}        element={<NewsList />} />
          <Route path={ROUTES.NEWS_CREATE} element={<CreateNews />} />
          <Route path={ROUTES.NEWS_EDIT}   element={<EditNews />} />
          <Route path={ROUTES.NEWS_VIEW}   element={<ViewNews />} />

          {/* Events */}
          <Route path={ROUTES.EVENTS}        element={<EventsList />} />
          <Route path={ROUTES.EVENTS_CREATE} element={<CreateEvent />} />
          <Route path={ROUTES.EVENTS_EDIT}   element={<EditEvent />} />
          <Route path={ROUTES.EVENTS_VIEW}   element={<ViewEvent />} />

          {/* Videos */}
          <Route path={ROUTES.VIDEOS}        element={<VideosList />} />
          <Route path={ROUTES.VIDEOS_UPLOAD} element={<UploadVideo />} />
          <Route path={ROUTES.VIDEOS_EDIT}   element={<EditVideo />} />
          <Route path={ROUTES.VIDEOS_VIEW}   element={<ViewVideo />} />

          {/* Gallery */}
          <Route path={ROUTES.GALLERY}         element={<GalleryList />} />
          <Route path={ROUTES.GALLERY_UPLOAD}  element={<UploadImage />} />
          <Route path={ROUTES.GALLERY_ALBUMS}  element={<Albums />} />
          <Route path={ROUTES.GALLERY_PREVIEW} element={<GalleryPreview />} />

          {/* Research */}
          <Route path={ROUTES.RESEARCH}        element={<ResearchList />} />
          <Route path={ROUTES.RESEARCH_CREATE} element={<CreateResearch />} />
          <Route path={ROUTES.RESEARCH_EDIT}   element={<EditResearch />} />
          <Route path={ROUTES.RESEARCH_VIEW}   element={<ViewResearch />} />

          {/* Members */}
          <Route path={ROUTES.MEMBERS}          element={<Members />} />
          <Route path={ROUTES.MEMBERS_REQUESTS} element={<MembershipRequests />} />
          <Route path={ROUTES.MEMBERS_PROFILE}  element={<MemberProfile />} />
          <Route path={ROUTES.MEMBERS_ADD}      element={<AddMember />} />

          {/* Resources */}
          <Route path={ROUTES.RESOURCES}             element={<Resources />} />
          <Route path={ROUTES.RESOURCES_UPLOAD}      element={<UploadResource />} />
          <Route path={ROUTES.RESOURCES_CATEGORIES}  element={<Categories />} />

          {/* Contact */}
          <Route path={ROUTES.CONTACT}         element={<Messages />} />
          <Route path={ROUTES.CONTACT_MESSAGE} element={<MessageDetails />} />

          {/* Settings */}
          <Route path={ROUTES.SETTINGS}          element={<GeneralSettings />} />
          <Route path={ROUTES.SETTINGS_SOCIAL}   element={<SocialSettings />} />
          <Route path={ROUTES.SETTINGS_WEBSITE}  element={<WebsiteSettings />} />
          <Route path={ROUTES.SETTINGS_PROFILE}  element={<ProfileSettings />} />
          <Route path={ROUTES.SETTINGS_SECURITY} element={<SecuritySettings />} />
        </Route>
      </Route>

      {/* ── Error pages ── */}
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={ROUTES.NOT_FOUND}    element={<NotFound />} />
      <Route path="*"                   element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
