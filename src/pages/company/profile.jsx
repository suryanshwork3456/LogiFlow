import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "../../styles/companystyles.js";

function profile({ onComplete }) {
  const [form, setForm] = useState({
    name: "",
    emergencyContact: "",
    whyChooseUs: "",
    logoPreview: null,
  });
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const navigate = useNavigate(); 

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, logoPreview: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    const e = {};

    if (!form.name.trim())
      e.name = "Company name is required";

    if (!form.emergencyContact.trim())
      e.emergencyContact = "Emergency contact is required";

    if (!form.whyChooseUs.trim())
      e.whyChooseUs = "Please fill this field";

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      const company = JSON.parse(
        localStorage.getItem("company")
      );

      const response = await fetch(
        `http://localhost:8000/api/companies/${company.company_id}/setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_name: form.name,
            emergency_contact: form.emergencyContact,
            description: form.whyChooseUs,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed to save company");
        return;
      }

      localStorage.setItem(
        "company",
        JSON.stringify({
          ...company,
          company_name: data.company_name,
          is_setup_complete: true,
        })
      );

      navigate("/company/dashboard");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        ...S.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 1.25rem",
        position: "relative",
        overflow: "hidden",
        // darker background overlay
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.2), transparent 60%)," +
          "radial-gradient(circle at bottom, rgba(249,115,22,0.18), transparent 55%)," +
          "#020617",
        color: "#E5E7EB",
      }}
    >
      {/* soft glows (dark theme) */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 520 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.35)",
              borderRadius: 999,
              padding: "6px 18px",
              color: "#4ade80",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 10px rgba(74,222,128,0.9)",
              }}
            />
            Company Onboarding
          </div>

          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#F9FAFB",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Set up your
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #38bdf8, #6366f1, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Company Profile
            </span>
          </h1>
          <p
            style={{
              color: "rgba(148,163,184,0.9)",
              fontSize: 13,
              marginTop: 12,
            }}
          >
            Just a few details to personalize your logistics dashboard.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            ...S.card,
            padding: 30,
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow:
              "0 22px 45px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.8)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Logo upload */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 26,
            }}
          >
            <div
              onClick={() => fileRef.current.click()}
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                border: "1px dashed rgba(148,163,184,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                background:
                  "radial-gradient(circle at top, rgba(30,64,175,0.7), rgba(15,23,42,1))",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease",
                boxShadow: "0 12px 28px rgba(15,23,42,0.9)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(1.01)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(15,23,42,1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(15,23,42,0.9)";
              }}
            >
              {form.logoPreview ? (
                <img
                  src={form.logoPreview}
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28 }}>🏢</div>
                  <div
                    style={{
                      color: "rgba(156,163,175,0.85)",
                      fontSize: 10,
                      marginTop: 4,
                    }}
                  >
                    Upload Logo
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogo}
            />
            <p
              style={{
                color: "rgba(148,163,184,0.9)",
                fontSize: 11,
                marginTop: 8,
              }}
            >
              Company Logo (optional)
            </p>
          </div>

          {/* Fields */}
          {[
            {
              key: "name",
              label: "Company Name",
              placeholder: "e.g. SwiftHaul Logistics",
              type: "text",
            },
            {
              key: "emergencyContact",
              label: "Emergency Contact",
              placeholder: "+91-XXXXXXXXXX",
              type: "tel",
            },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(148,163,184,0.9)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => {
                  setForm((p) => ({ ...p, [f.key]: e.target.value }));
                  setErrors((p) => ({ ...p, [f.key]: "" }));
                }}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: errors[f.key]
                    ? "rgba(127,29,29,0.18)"
                    : "rgba(15,23,42,0.95)",
                  border: `1px solid ${
                    errors[f.key]
                      ? "rgba(248,113,113,0.85)"
                      : "rgba(51,65,85,0.9)"
                  }`,
                  borderRadius: 12,
                  padding: "11px 14px",
                  color: "#E5E7EB",
                  fontSize: 13,
                  outline: "none",
                  transition: "border 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 0 0 1px rgba(15,23,42,1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid #38bdf8";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 1px rgba(56,189,248,0.9)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = `1px solid ${
                    errors[f.key]
                      ? "rgba(248,113,113,0.85)"
                      : "rgba(51,65,85,0.9)"
                  }`;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 1px rgba(15,23,42,1)";
                }}
              />
              {errors[f.key] && (
                <p
                  style={{
                    color: "#f97373",
                    fontSize: 11,
                    marginTop: 6,
                  }}
                >
                  {errors[f.key]}
                </p>
              )}
            </div>
          ))}

          {/* Why Choose Us */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                color: "rgba(148,163,184,0.9)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Why Choose Us
            </label>
            <textarea
              rows={4}
              placeholder="Describe what makes your company stand out — reliability, speed, coverage..."
              value={form.whyChooseUs}
              onChange={(e) => {
                setForm((f) => ({ ...f, whyChooseUs: e.target.value }));
                setErrors((p) => ({ ...p, whyChooseUs: "" }));
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: errors.whyChooseUs
                  ? "rgba(127,29,29,0.18)"
                  : "rgba(15,23,42,0.95)",
                border: `1px solid ${
                  errors.whyChooseUs
                    ? "rgba(248,113,113,0.85)"
                    : "rgba(51,65,85,0.9)"
                }`,
                borderRadius: 12,
                padding: "11px 14px",
                color: "#E5E7EB",
                fontSize: 13,
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                transition: "border 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 0 0 1px rgba(15,23,42,1)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid #38bdf8";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(56,189,248,0.9)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = `1px solid ${
                  errors.whyChooseUs
                    ? "rgba(248,113,113,0.85)"
                    : "rgba(51,65,85,0.9)"
                }`;
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(15,23,42,1)";
              }}
            />
            {errors.whyChooseUs && (
              <p
                style={{
                  color: "#f97373",
                  fontSize: 11,
                  marginTop: 6,
                }}
              >
                {errors.whyChooseUs}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={submit}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              padding: "13px 0",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: "0 18px 40px rgba(22,163,74,0.45)",
              textTransform: "uppercase",
            }}
          >
            Launch Dashboard →
          </button>
          <p
            style={{
              textAlign: "center",
              color: "rgba(148,163,184,0.85)",
              fontSize: 11,
              marginTop: 12,
            }}
          >
            Your data stays encrypted and visible only inside your workspace.
          </p>
        </div>
      </div>
    </div>
  );
}

export default profile;