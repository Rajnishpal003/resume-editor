// App.jsx
import React, { useState } from "react";
import Header from "./Header";
import ResumeLogic from "./ResumeLogic";
import AuthPage from "./AuthPage";

function App() {
  const [previewData, setPreviewData] = useState({});
  const [user, setUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const [downloadPDFFunc, setDownloadPDFFunc] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return <AuthPage onLogin={setUser} />;

  return (
    <>
      <Header
        username={user}
        onLogout={handleLogout}
        onTemplateSelect={setSelectedTemplate}
        previewData={previewData}
        downloadPDF={downloadPDFFunc}
      />
      <ResumeLogic
        selectedTemplate={selectedTemplate}
        setPreviewData={setPreviewData}
        registerDownload={setDownloadPDFFunc} // 🔁 pass handler to register downloadPDF
      />
    </>
  );
}

export default App;
