"""Generate the downloadable portfolio resume PDF from profile data.

Run with a Python environment that includes reportlab:
  /tmp/resume-pdf-venv/bin/python scripts/generate_resume.py
"""
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
)

ROOT = Path(__file__).resolve().parents[1]
PROFILE = json.loads((ROOT / "src/data/profile.json").read_text())
OUTPUT = ROOT / "public/Jaibir-Singh-Resume.pdf"

NAVY = colors.HexColor("#0F172A")
BLUE = colors.HexColor("#0284C7")
CYAN = colors.HexColor("#0D9488")
SLATE = colors.HexColor("#475569")
LIGHT = colors.HexColor("#E2E8F0")
PALE = colors.HexColor("#F8FAFC")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=22,
    leading=25, textColor=NAVY, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Headline", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.3,
    leading=13, textColor=BLUE, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.7,
    leading=11, textColor=SLATE,
))
styles.add(ParagraphStyle(
    name="Section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.5,
    leading=13, textColor=NAVY, spaceBefore=9, spaceAfter=4,
    borderWidth=0, borderColor=BLUE,
))
styles.add(ParagraphStyle(
    name="BodyResume", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5,
    leading=11.6, textColor=NAVY, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="Small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.8,
    leading=10, textColor=SLATE,
))
styles.add(ParagraphStyle(
    name="Role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=9.1,
    leading=11.5, textColor=NAVY,
))
styles.add(ParagraphStyle(
    name="Project", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.4,
    leading=10.5, textColor=BLUE,
))


def p(text, style="BodyResume"):
    return Paragraph(text, styles[style])


def section(title):
    table = Table([[p(title.upper(), "Section")]], colWidths=[17.1 * cm])
    table.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.8, BLUE),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return table


def experience_entry(company, role, period, location, description, projects=None):
    head = Table([[p(f"{company} | {role}", "Role"), p(period, "Small")]], colWidths=[12.4 * cm, 4.7 * cm])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    content = [head, p(location, "Small"), p(description)]
    for project in projects or []:
        tech = ", ".join(project["technologies"])
        content.append(p(project["title"], "Project"))
        content.append(p(project["summary"]))
        content.append(p(f"<b>Tech:</b> {tech}", "Small"))
    return KeepTogether(content + [Spacer(1, 4)])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LIGHT)
    canvas.line(doc.leftMargin, 1.25 * cm, A4[0] - doc.rightMargin, 1.25 * cm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(doc.leftMargin, 0.82 * cm, "Jaibir Singh | Forward Deployed AI Engineer")
    canvas.drawRightString(A4[0] - doc.rightMargin, 0.82 * cm, f"Page {doc.page}")
    canvas.restoreState()


def main():
    personal = PROFILE["personal"]
    experience = PROFILE["experience"]
    story = []

    story.append(p(personal["name"], "Name"))
    story.append(p("Forward Deployed AI Engineer | Senior Technical Specialist", "Headline"))
    story.append(p(
        f"{personal['location']}  |  {personal['email']}  |  {personal['phone']}  |  "
        f"{personal['website']}  |  github.com/jbr2021", "Contact"
    ))
    story.append(Spacer(1, 8))

    story.append(section("Professional Summary"))
    story.append(Spacer(1, 3))
    story.append(p(
        "Senior Technical Specialist and Forward Deployed AI Engineer with 15+ years of experience "
        "delivering enterprise web, cloud, and AI solutions. Specializes in Agentic AI, AI Agents, "
        "LangGraph/StateGraph, Azure OpenAI, RAG, document intelligence, and cloud-native integration. "
        "Experienced in translating complex operational requirements into production-ready applications."
    ))

    story.append(section("Core Expertise"))
    story.append(Spacer(1, 3))
    expertise = [
        "Agentic AI & AI Agents: LangGraph, StateGraph, tool routing, multi-step workflows",
        "Enterprise RAG: Azure AI Search, SharePoint, vector retrieval, grounded responses",
        "GenAI & Document Intelligence: Azure OpenAI, document validation, summaries, tracked-change reports",
        "Cloud & Delivery: Azure Web Apps, Functions, Blob Storage, API Management, Docker, Kubernetes",
        "Engineering: Python, FastAPI, Angular, .NET, React, MS SQL, PostgreSQL",
    ]
    story.append(p("<br/>".join([f"• {item}" for item in expertise])))

    story.append(section("Professional Experience"))
    story.append(Spacer(1, 3))

    senior_projects = [
        experience[0]["projects"][0], experience[0]["projects"][1], experience[0]["projects"][3]
    ]
    story.append(experience_entry(
        "HCL Technologies", "Senior Technical Specialist", "Jan 2026 — Present",
        "Sector 126, Noida, Uttar Pradesh, India",
        "Leading AI engineering and cloud architecture initiatives for enterprise clients, with a focus on deployable AI Agent, Agentic AI, and RAG solutions.",
        senior_projects,
    ))
    story.append(experience_entry(
        "HCL Technologies", "Technical Specialist", "Sep 2021 — Dec 2025",
        "Sector 126, Noida, Uttar Pradesh, India",
        "Delivered AI engineering and cloud architecture initiatives for premier international clients including the World Bank Group and ANZ Bank.",
        [experience[0]["projects"][2], experience[0]["projects"][4], experience[0]["projects"][5]],
    ))
    story.append(experience_entry(
        "GetOn Infotech Pvt. Ltd.", "Development Head", "Apr 2017 — Aug 2021",
        "Connaught Place, New Delhi, India",
        "Led end-to-end application delivery across Azure DevOps deployments, automation workflows, and business-critical accounting and production systems.",
    ))
    story.append(experience_entry(
        "ABL Online", "Team Lead", "Apr 2014 — Apr 2017",
        "Connaught Place, New Delhi, India",
        "Architected transactional applications for invoicing, GST taxation, payroll, CRM, HRM, and cloud-based business operations.",
    ))
    story.append(experience_entry(
        "ABL Online", "Web Developer", "Jun 2011 — Apr 2014",
        "Connaught Place, New Delhi, India",
        "Developed web applications including property and job portals, CRM/HRM systems, and virtual-number solutions.",
    ))

    story.append(section("Selected Earlier Experience"))
    story.append(Spacer(1, 3))
    story.append(p("<b>IBM Daksh | Customer Care Executive | Apr 2010 — Apr 2011</b><br/>"
                   "Gurgaon, Haryana, India | Supported healthcare backend operations using MS-DOS-based software."))

    story.append(section("Education & Certification"))
    story.append(Spacer(1, 3))
    story.append(p("<b>Professional Cloud Developer (English)</b> | Google Cloud Platform<br/>"
                   "Issued 1 Aug 2022 | Certification ID: aeaduY"))
    story.append(p("<b>GNIIT (Software Engineer Course)</b> | NIIT, South Ex Campus, Delhi | 2006 — 2009"))
    story.append(p("<b>Bachelor of Commerce (BCom)</b> | Delhi Open University | 2005 — 2008"))

    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, rightMargin=1.75 * cm, leftMargin=1.75 * cm,
        topMargin=1.35 * cm, bottomMargin=1.7 * cm, title="Jaibir Singh Resume", author="Jaibir Singh"
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
