import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [applicationDate, setApplicationDate] = useState("");

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8080/api/jobs";

  // =========================
  // GET ALL JOBS
  // =========================
  const fetchJobs = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
      setError("");
    } catch (error) {
      console.error("Error fetching jobs:", error);

      setError(
        "Cannot connect to the Java backend. Make sure Spring Boot is running on port 8080."
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================
  // ADD / UPDATE JOB
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const job = {
      company: company,
      role: role,
      status: status,
      applicationDate: applicationDate,
    };

    console.log("Sending job to backend:", job);

    try {
      let response;

      if (editingId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      } else {
        // ADD
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      }

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Backend error:", errorText);

        throw new Error(
          `Backend returned ${response.status}: ${errorText}`
        );
      }

      const savedJob = await response.json();

      console.log("Saved job:", savedJob);

      if (editingId) {
        setMessage("✅ Job application updated successfully!");
      } else {
        setMessage("✅ Job application added successfully!");
      }

      clearForm();

      // Refresh jobs from database
      await fetchJobs();

    } catch (error) {
      console.error("Error saving job:", error);

      setError(
        "❌ Cannot save the job. Make sure the Spring Boot backend is running on http://localhost:8080."
      );
    }
  };

  // =========================
  // DELETE JOB
  // =========================
  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      setMessage("✅ Job application deleted successfully!");

      await fetchJobs();

    } catch (error) {
      console.error("Error deleting job:", error);

      setError("❌ Unable to delete the job application.");
    }
  };

  // =========================
  // EDIT JOB
  // =========================
  const editJob = (job) => {
    setEditingId(job.id);

    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setApplicationDate(job.applicationDate || "");

    setMessage("");
    setError("");

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {
    setEditingId(null);
    setCompany("");
    setRole("");
    setStatus("Applied");
    setApplicationDate("");
  };

  // =========================
  // SEARCH
  // =========================
  const filteredJobs = jobs.filter((job) => {
    const companyName = job.company || "";
    const jobRole = job.role || "";
    const jobStatus = job.status || "";

    const searchText = search.toLowerCase();

    return (
      companyName.toLowerCase().includes(searchText) ||
      jobRole.toLowerCase().includes(searchText) ||
      jobStatus.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // UI
  // =========================
  return (
    <div className="app">

      {/* HEADER */}
      <header>
        <h1>💼 Job Application Tracker</h1>

        <p>
          Track your job applications in one place
        </p>
      </header>

      <main>
        {/* DASHBOARD STATS */}
<div className="stats-container">

  <div className="stat-card">
    <h3>Total Applications</h3>
    <p>{jobs.length}</p>
  </div>

  <div className="stat-card">
    <h3>Interviews</h3>
    <p>
      {jobs.filter((job) => job.status === "Interview").length}
    </p>
  </div>

  <div className="stat-card">
    <h3>Selected</h3>
    <p>
      {jobs.filter((job) => job.status === "Selected").length}
    </p>
  </div>

  <div className="stat-card">
    <h3>Rejected</h3>
    <p>
      {jobs.filter((job) => job.status === "Rejected").length}
    </p>
  </div>

</div>
        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* ADD / UPDATE FORM */}
        <section className="form-card">

          <h2>
            {editingId
              ? "Update Application"
              : "Add Job Application"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* COMPANY */}
            <div className="form-group">

              <label>
                Company
              </label>

              <input
                type="text"
                placeholder="e.g. Infosys"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                required
              />

            </div>

            {/* ROLE */}
            <div className="form-group">

              <label>
                Job Role
              </label>

              <input
                type="text"
                placeholder="e.g. Java Developer"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                required
              />

            </div>

            {/* STATUS */}
            <div className="form-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Rejected">
                  Rejected
                </option>

                <option value="Offer">
                  Offer
                </option>

              </select>

            </div>

            {/* DATE */}
            <div className="form-group">

              <label>
                Application Date
              </label>

              <input
                type="date"
                value={applicationDate}
                onChange={(e) =>
                  setApplicationDate(e.target.value)
                }
                required
              />

            </div>

            {/* BUTTONS */}
            <div className="button-group">

              <button
                type="submit"
                className="primary-btn"
              >
                {editingId
                  ? "Update Job"
                  : "Add Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    clearForm();
                    setMessage("");
                    setError("");
                  }}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* APPLICATIONS */}
        <section className="jobs-section">

          <div className="section-header">

            <h2>
              My Applications
            </h2>

            <input
              className="search-box"
              type="text"
              placeholder="🔍 Search applications..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* NO JOBS */}
          {filteredJobs.length === 0 ? (

            <div className="empty">

              <h3>
                No applications found
              </h3>

              <p>
                Add your first job application above.
              </p>

            </div>

          ) : (

            /* JOB CARDS */
            <div className="jobs-grid">

              {filteredJobs.map((job) => (

                <div
                  className="job-card"
                  key={job.id}
                >

                  <div className="job-top">

                    <div>

                      <h3>
                        {job.company}
                      </h3>

                      <p>
                        {job.role}
                      </p>

                    </div>

                    <span
                      className={`status ${job.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {job.status}
                    </span>

                  </div>

                  <p className="date">
                    📅 Applied:{" "}
                    {job.applicationDate}
                  </p>

                  <div className="card-actions">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editJob(job)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteJob(job.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;