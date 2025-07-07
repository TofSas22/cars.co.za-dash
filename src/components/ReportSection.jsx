export default function ReportSection({ report }) {
    if (!report) return null;
  
    return (
      <div className="report-section">
        <h3>Engagement Report</h3>
        <pre>{report}</pre>
      </div>
    );
  }
  