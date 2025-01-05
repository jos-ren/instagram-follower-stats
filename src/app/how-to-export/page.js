"use client";

import { Card } from "antd";
import Link from "next/link";
import { FaArrowLeft, FaInstagram, FaDownload, FaFile, FaFolder } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const styles = {
    pageContainer: {
        padding: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        '@media (minWidth: 768px)': {
            padding: '24px',
        },
    },
    breadcrumb: {
        marginBottom: '24px',
    },
    backLink: {
        color: '#666',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        padding: '8px 0',
    },
    videoContainer: {
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#f0f0f0',
        borderRadius: '12px',
        marginBottom: '32px',
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '700',
        marginBottom: '24px',
        '@media (minWidth: 768px)': {
            fontSize: '2.25rem',
        },
    },
    stepCard: {
        marginBottom: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    stepHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '16px',
    },
    stepNumber: {
        background: '#0095f6',
        color: 'white',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        flexShrink: 0,
    },
    stepTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '4px',
    },
    stepDescription: {
        color: '#666',
        fontSize: '0.95rem',
        lineHeight: '1.6',
    },
    note: {
        marginTop: '32px',
        padding: '16px',
        background: 'rgba(0, 149, 246, 0.1)',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#666',
    },
    stepContent: {
        flex: 1,
    },
    stepTitleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
    },
    substepsList: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    substep: {
        display: 'flex',
        gap: '8px',
        fontSize: '0.9rem',
        color: '#4B5563',
        padding: '4px 0',
    },
    substepNumber: {
        color: '#0095f6',
        fontWeight: '600',
        minWidth: '20px',
    },
    substepText: {
        flex: 1,
        lineHeight: '1.5',
    },
};

export default function HowToExport() {
    const steps = [
        {
            icon: <FaInstagram size={20} />,
            title: "Navigate to Instagram Data Download",
            description: "Open the Instagram app and navigate to the data download settings",
            substeps: [
                "Open Instagram app",
                "Go to 'Settings'",
                "Click on 'Accounts Center'",
                "Select 'Your information and permissions'",
                "Click 'Download your information'"
            ]
        },
        {
            icon: <FaDownload size={20} />,
            title: "Configure Your Data Request",
            description: "Select what data you want to download",
            substeps: [
                "Click 'Download or transfer information'",
                "Select your Instagram profile",
                "Choose 'Some of your information'",
                "Find and select only 'Followers and following' under Connections section then click 'Next'",
                "Choose 'Download to device'",
                "Set date range to 'All time'",
                "Enter your preferred email address",
                "Select 'JSON format'",
                "Keep quality at 'Medium'",
                "Click 'Create files' button"
            ]
        },
        {
            icon: <MdEmail size={20} />,
            title: "Wait for Email Notification",
            description: "Instagram will prepare your data",
            substeps: [
                "Check your email for a notification",
                "Usually takes a few minutes",
                "Can take up to 48 hours for large accounts",
                "Once email is received, you can click the 'download your information' button in the email, or navigate directly to the 'Download your information' section from previous steps"
            ]
        },
        {
            icon: <FaFolder size={20} />,
            title: "Locate Required Files",
            description: "Find and extract the necessary JSON files",
            substeps: [
                "Click the 'Download your information' button in Instagram",
                "Navigate to your file downloads and Unzip/Extract the downloaded file",
                "Open the extracted folder",
                "Open the 'connections' folder",
                "Open the 'followers_and_following' folder",
                "Find 'following.json' and 'followers.json' (may be named 'followers_1.json')",
                "These are the files you need to upload to our analyzer"
            ]
        }
    ];

    return (
        <div style={styles.pageContainer}>
            <div style={styles.breadcrumb}>
                <Link href="/" style={styles.backLink}>
                    <FaArrowLeft size={14} />
                    <span>Back to Home</span>
                </Link>
            </div>

            <h1 style={styles.title}>How to Export Your Instagram Data</h1>
            <div style={styles.videoContainer}>
                <iframe
                    style={styles.video}
                    src="https://www.youtube.com/embed/dybw92rtYbY"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div>
                {steps.map((step, index) => (
                    <Card key={index} style={styles.stepCard}>
                        <div style={styles.stepHeader}>
                            <div style={styles.stepNumber}>{index + 1}</div>
                            <div style={styles.stepContent}>
                                <div style={styles.stepTitleRow}>
                                    {step.icon}
                                    <h3 style={styles.stepTitle}>{step.title}</h3>
                                </div>
                                <p style={styles.stepDescription}>{step.description}</p>

                                <div style={styles.substepsList}>
                                    {step.substeps.map((substep, subIndex) => (
                                        <div key={subIndex} style={styles.substep}>
                                            <span style={styles.substepNumber}>{subIndex + 1}.</span>
                                            <span style={styles.substepText}>{substep}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div style={styles.note}>
                <strong>Note:</strong> The process might take a few minutes/hours as Instagram prepares your data.
                Make sure to request the data in JSON format for compatibility with our analyzer.
            </div>
        </div>
    );
}