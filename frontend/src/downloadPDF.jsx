const downloadPDF = () => {
  const doc = new jsPDF();

  if (selectedTemplate === "classic") {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Resume", 14, 20);
    const rows = Object.entries(previewData).map(([key, value]) => [key, value]);
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Content"]],
      body: rows,
    });
  }

  else if (selectedTemplate === "modern") {
    doc.setFillColor(240, 240, 255);
    doc.rect(0, 0, 210, 297, "F");
    doc.setTextColor(40, 40, 90);
    doc.setFontSize(22);
    doc.text("Modern Resume", 14, 20);
    const rows = Object.entries(previewData).map(([key, value]) => [key.toUpperCase(), value]);
    autoTable(doc, {
      startY: 35,
      head: [["Section", "Details"]],
      body: rows,
      styles: { fillColor: [240, 248, 255] },
      headStyles: { fillColor: [70, 130, 180], textColor: 255 },
    });
  }

  else if (selectedTemplate === "minimal") {
    doc.setFontSize(16);
    doc.text("Minimal Resume", 105, 20, null, null, "center");
    const rows = Object.entries(previewData).map(([key, value]) => [key, value]);
    autoTable(doc, {
      startY: 30,
      body: rows,
      styles: { fontSize: 10 },
    });
  }

  doc.save("resume.pdf");
};
