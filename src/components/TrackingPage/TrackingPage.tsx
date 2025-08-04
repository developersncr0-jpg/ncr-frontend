import React, { useEffect, useState } from "react";
import NavigationBar from "../FormPage/NavigationBar";

interface Application {
  applicationId: string;
  personId: string;
  applicantName: string;
  legalStatus: string;
  ciproRegistrationNumber: string;
  dateOfCommencement: string;
  financialYearEnd: string;
  incomeTaxNumber: string;
  vatRegistrationNumber: string;
  createdAt: string;
  updatedAt: string;
  status: string | null;
}

const TrackingPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ncr-backend-701153034898.europe-west1.run.app/viewbypersonid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        personalId: "12462",
      },
    })
      .then((res) => res.json())
      .then((data: Application[]) => {
        // 🔽 Sort by createdAt from newest to oldest
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setApplications(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-orange-500 text-white text-center py-4 rounded-md shadow-md">
          <h1 className="text-2xl font-bold">APPLICATION TRACKING</h1>
        </div>

        <div className="mt-6 overflow-x-auto shadow-md rounded-md border border-gray-200">
          {loading ? (
            <p className="text-center py-6 text-gray-600">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-center py-6 text-gray-600">
              No applications found.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 font-semibold">Date Of Submission</th>
                  <th className="py-3 px-4 font-semibold">Application Number</th>
                  <th className="py-3 px-4 font-semibold">Full Name</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Download Certificate</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(app.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="py-3 px-4">{app.applicationId}</td>
                    <td className="py-3 px-4">{app.applicantName}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        app.status?.toLowerCase() === "approved"
                          ? "text-green-600"
                          : app.status?.toLowerCase() === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.status ?? "Pending"}
                    </td>
                    <td className="py-3 px-4">
                      {app.status?.toLowerCase() === "approved" ? (
                        <a
                          href="/assets/certificate.png"
                          download="certificate.png"
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
