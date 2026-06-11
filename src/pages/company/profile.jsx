import { useState, useRef } from "react";
import { S } from "../../styles/companystyles.js";
function profile({ onComplete }) {
  const [form, setForm] = useState({ name: "", emergencyContact: "", whyChooseUs: "", logoPreview: null });
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, logoPreview: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Company name is required";
    if (!form.emergencyContact.trim()) e.emergencyContact = "Emergency contact is required";
    if (!form.whyChooseUs.trim()) e.whyChooseUs = "Please fill this field";
    if (Object.keys(e).length) { setErrors(e); return; }
    onComplete(form);
  };

  return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", position: "relative", overflow: "hidden" }}>
      {/* bg glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 480 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 999, padding: "6px 16px", color: "#fb923c", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fb923c", animation: "pulse 2s infinite" }} />
            Company Onboarding
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1.15, margin: 0 }}>
            Set up your<br />
            <span style={{ background: "linear-gradient(135deg, #fb923c, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Company Profile
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 12 }}>
            Takes 2 minutes. Your dashboard awaits.
          </p>
        </div>

        {/* Card */}
        <div style={{ ...S.card, padding: 32 }}>
          {/* Logo upload */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
            <div
              onClick={() => fileRef.current.click()}
              style={{ width: 96, height: 96, borderRadius: 20, border: "2px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", background: "rgba(255,255,255,0.03)", transition: "all 0.2s" }}
            >
              {form.logoPreview ? (
                <img src={form.logoPreview} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28 }}>🏢</div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 4 }}>Upload Logo</div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogo} />
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 8 }}>Company Logo (optional)</p>
          </div>

          {/* Fields */}
          {[
            { key: "name", label: "Company Name", placeholder: "e.g. SwiftHaul Logistics", type: "text" },
            { key: "emergencyContact", label: "Emergency Contact", placeholder: "+91-XXXXXXXXXX", type: "tel" },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => { setForm((p) => ({ ...p, [f.key]: e.target.value })); setErrors((p) => ({ ...p, [f.key]: "" })); }}
                style={{ width: "100%", boxSizing: "border-box", background: errors[f.key] ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.04)", border: `1px solid ${errors[f.key] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 13, outline: "none" }}
              />
              {errors[f.key] && <p style={{ color: "#f87171", fontSize: 11, marginTop: 6 }}>{errors[f.key]}</p>}
            </div>
          ))}

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              Why Choose Us
            </label>
            <textarea
              rows={4}
              placeholder="Describe what makes your company stand out — reliability, speed, coverage..."
              value={form.whyChooseUs}
              onChange={(e) => { setForm((f) => ({ ...f, whyChooseUs: e.target.value })); setErrors((p) => ({ ...p, whyChooseUs: "" })); }}
              style={{ width: "100%", boxSizing: "border-box", background: errors.whyChooseUs ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.04)", border: `1px solid ${errors.whyChooseUs ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit" }}
            />
            {errors.whyChooseUs && <p style={{ color: "#f87171", fontSize: 11, marginTop: 6 }}>{errors.whyChooseUs}</p>}
          </div>

          <button
            onClick={submit}
            style={{ width: "100%", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", fontWeight: 700, fontSize: 14, padding: "14px 0", borderRadius: 12, border: "none", cursor: "pointer", letterSpacing: "0.02em", boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}
          >
            Launch Dashboard →
          </button>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 12 }}>
            Your data stays private. Only you see your profile details.
          </p>
        </div>
      </div>
    </div>
  );
}
export default profile;