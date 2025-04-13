import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AuthProvider } from "./hooks/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./hooks/Toast";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { FormPage } from "./components/FormPage";
import { BackdropProvider } from "./hooks/Backdrop";
import { SubmissionPage } from "./components/SubmissionPage";
import { FormEdit } from "./components/FormEdit";
import { TemplateFormEdit } from "./components/TemplateFormEdit";
import { TemplatesPage } from "./components/TemplatesPage";
import { LandingPageWrapper } from "./components/LandingPageWrapper";
import { AIFormEdit } from "./components/AIFormEdit";
import { AIFormGeneratorPage } from "./components/AIFormGeneratorPage";
import { TermsAndPrivacy } from "./components/TermsAndPrivacy";
import { MCQ } from "./components/MCQ";

function App() {
  const terms = {
    title: "FormsCraft Terms of Service",
    last_updated: "July 2nd, 2023",
    description: `Welcome to FormsCraft! Please read these Terms of Service ("Terms")
        carefully as they contain important information regarding your legal
        rights, remedies, and obligations.`,
    points: [
      {
        title: "Acceptance of Terms",
        description:
          "By accessing or using any services of FormsCraft, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the services.",
      },
      {
        title: "Services",
        description: `FormsCraft provides an online platform that allows users to create, customize, distribute, and manage forms ("Services"). FormsCraft reserves the right to modify or discontinue the Services at any time.`,
      },
      {
        title: "Registration",
        description:
          "You must register an account to use the Services. You are responsible for keeping your password secure and for all activities that occur under your account.",
      },
      {
        title: "Use of Services",
        description:
          "You agree to use the Services only for lawful purposes and in accordance with these Terms. You will not use the Services to collect sensitive information without proper consent or to engage in any activity that violates the rights of others.",
      },
      {
        title: "Intellectual Property",
        description:
          "FormsCraft owns all intellectual property rights to the Services. You are granted a limited, non-exclusive, non-transferable license to use the Services.",
      },
      {
        title: "User Content",
        description:
          "You retain all rights to the content you submit through the Services. You grant FormsCraft a license to use, copy, and display the content only as necessary to provide the Services.",
      },
      {
        title: "Data Protection",
        description:
          "FormsCraft will handle your data in accordance with our Privacy Policy",
      },
      {
        title: "Limitation of Liability",
        description:
          "FormsCraft shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Services.",
      },
      {
        title: "Termination",
        description:
          "FormsCraft may terminate your access to the Services for any reason, including violation of these Terms.",
      },
      {
        title: "Changes to Terms",
        description:
          "FormsCraft may update these Terms at any time. It is your responsibility to review the Terms regularly.",
      },
    ],
  };

  const privacy = {
    title: "FormsCraft Privacy Policy",
    last_updated: "July 2nd, 2023",
    description:
      "Your privacy is important to FormsCraft. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
    points: [
      {
        title: "Information We Collect",
        description:
          "We may collect information you provide, such as your name, email address, and any content you submit through our services. We also collect technical data, such as IP addresses and cookies.",
      },
      {
        title: "How We Use Information",
        description:
          "We use the information to provide, maintain, and improve our services. This includes communicating with you, optimizing our platform, and personalizing user experience.",
      },
      {
        title: "Sharing of Information",
        description:
          "We do not sell your personal information. We may share information with third-party service providers to perform services on our behalf.",
      },
      {
        title: "Cookies",
        description:
          "We use cookies to enhance your experience. You can manage cookies through your browser settings.",
      },
      {
        title: "Data Security",
        description:
          "We take measures to protect your information from unauthorized access, alteration, and disclosure. However, no method of transmission over the internet is completely secure.",
      },
      {
        title: "Data Retention",
        description:
          "We retain your information for as long as necessary to provide our services or as required by law.",
      },
      {
        title: "Children’s Privacy",
        description:
          "Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.",
      },
      {
        title: "International Transfers",
        description:
          "Your information may be transferred to, and maintained on, computers located outside of your jurisdiction where the data protection laws may be different.",
      },
    ],
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="bg-gray-50 min-h-screen w-full max-w-[1600px]">
        <Router>
          <AuthProvider>
            <ToastProvider>
              <BackdropProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <LandingPageWrapper>
                        <Home />
                      </LandingPageWrapper>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/form-ai"
                    element={
                      <ProtectedRoute>
                        <AIFormGeneratorPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/forms/:id/edit"
                    element={
                      <ProtectedRoute>
                        <FormEdit />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/forms/:id"
                    element={
                      <ProtectedRoute>
                        <SubmissionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/templates/:id/edit"
                    element={
                      <ProtectedRoute>
                        <TemplateFormEdit />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ai/:id/edit"
                    element={
                      <ProtectedRoute>
                        <AIFormEdit />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/r/:id" element={<FormPage />} />
                  <Route
                    path="templates"
                    element={
                      <LandingPageWrapper>
                        <TemplatesPage />
                      </LandingPageWrapper>
                    }
                  />
                  <Route
                    path="terms"
                    element={
                      <LandingPageWrapper>
                        <TermsAndPrivacy data={terms} />
                      </LandingPageWrapper>
                    }
                  />
                  <Route
                    path="privacy"
                    element={
                      <LandingPageWrapper>
                        <TermsAndPrivacy data={privacy} />
                      </LandingPageWrapper>
                    }
                  />
                  {/* <Route
                    path="/mcq"
                    element={
                      <ProtectedRoute>
                        <MCQ />
                      </ProtectedRoute>
                    }
                  /> */}
                </Routes>
              </BackdropProvider>
            </ToastProvider>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
