"use client";

import { useState, useEffect } from "react";
import { FaCheck, FaUpload, FaDownload, FaArrowRight } from "react-icons/fa6";
import { Table, Button, Select, Card, Empty, Steps, Alert, Spin } from "antd";
import { HeroSection } from "./components/HeroSection.js";
import Link from "next/link";

const styles = {
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginBottom: '32px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
    },
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  featureIcon: {
    width: '32px',
    height: '32px',
    marginBottom: '8px',
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: '0.9rem',
    opacity: '0.9',
    lineHeight: '1.5',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'white',
    color: '#833ab4',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  pageContainer: {
    padding: '16px',
    maxWidth: '100%',
    margin: '0 auto',
    '@media (minWidth: 768px)': {
      padding: '24px',
    },
  },
  title: {
    fontSize: '1.5rem',
    textAlign: 'center',
    margin: '0 0 24px 0',
    '@media (minWidth: 768px)': {
      fontSize: '2rem',
    },
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
    width: '100%',
    '@media (minWidth: 768px)': {
      flexDirection: 'row',
      gap: '16px',
    },
  },
  filterCard: {
    marginBottom: '16px',
    padding: '12px',
    '@media (minWidth: 768px)': {
      padding: '16px',
    },
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    '@media (minWidth: 768px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    '@media (minWidth: 768px)': {
      width: 'auto',
    },
  },
  actionGroup: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    width: '100%',
    '@media (minWidth: 768px)': {
      width: 'auto',
      marginTop: '0',
      marginLeft: 'auto',
      alignSelf: 'flex-end',
    },
  },
  selectWidth: {
    width: '100%',
    '@media (minWidth: 768px)': {
      width: '120px',
    },
  },
  stepsCard: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '20px 10px',
  },
  steps: {
    '.ant-steps-item-title': {
      fontSize: '0.9rem',
      lineHeight: '1.2',
    },
    '@media (max-width: 768px)': {
      '.ant-steps-item-title': {
        fontSize: '0.85rem',
        lineHeight: '1.2',
      },
      '.ant-steps-item-description': {
        fontSize: '0.75rem',
      },
    },
  },
};

export default function Home() {
  const [uploadedFollowersFileName, setUploadedFollowersFileName] = useState(null);
  const [uploadedFollowingFileName, setUploadedFollowingFileName] = useState(null);
  const [followersData, setFollowersData] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [filteredResult, setFilteredResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    following: 'all',
    followedBy: 'all'
  });

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  // Calculate current step based on state
  const getCurrentStep = () => {
    if (!followersData) return 0;
    if (!followingData) return 1;
    if (isAnalyzing) return 2;
    return 3;
  };

  const getStepStatus = (step) => {
    const currentStep = getCurrentStep();
    if (step < currentStep) return 'finish';
    if (step === currentStep) return 'process';
    return 'wait';
  };

  const grabFile = async (setFileName, setData, fileType) => {
    setError(null);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsLoading(true);
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = JSON.parse(e.target.result);
            setFileName(file.name);
            setData(result);
            setError(null);
          } catch (err) {
            setError(`Invalid JSON file format for ${fileType}. Please ensure you're uploading the correct Instagram data export file.`);
          }
          setIsLoading(false);
        };
        reader.onerror = () => {
          setError(`Error reading ${fileType} file. Please try again.`);
          setIsLoading(false);
        };
        reader.readAsText(file);
      } catch (err) {
        setError(`Error processing ${fileType} file. Please try again.`);
        setIsLoading(false);
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    if (followersData && followingData) {
      setIsAnalyzing(true);
      // Artificial delay for UX
      const analysisTimer = setTimeout(() => {
        compareFiles();
        setIsAnalyzing(false);
      }, 500);
      return () => clearTimeout(analysisTimer);
    }
  }, [followersData, followingData]);

  useEffect(() => {
    if (comparisonResult) {
      applyFilters();
    }
  }, [filters, comparisonResult]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const extractUsernamesAndDates = (data) => {
    return data.map(item => ({
      username: item.string_list_data[0].value,
      date: new Date(item.string_list_data[0].timestamp * 1000).toLocaleDateString()
    }));
  };

  const compareFiles = () => {
    try {
      const followers = extractUsernamesAndDates(followersData);
      const following = extractUsernamesAndDates(followingData.relationships_following);

      const followersMap = new Map(followers.map(f => [f.username, f.date]));
      const followingMap = new Map(following.map(f => [f.username, f.date]));

      const allUsernames = new Set([...followersMap.keys(), ...followingMap.keys()]);

      const result = Array.from(allUsernames).map(username => ({
        key: username,
        username,
        following: followingMap.has(username) ? "Yes" : "No",
        followedBy: followersMap.has(username) ? "Yes" : "No",
        followingDate: followingMap.get(username) || null,
        followedByDate: followersMap.get(username) || null
      }));

      setComparisonResult(result);
      setFilteredResult(result);
      setError(null);
    } catch (err) {
      setError("Error comparing files. Please ensure you've uploaded the correct Instagram data export files.");
    }
  };

  const applyFilters = () => {
    let result = comparisonResult;
    if (filters.following !== 'all') {
      result = result.filter(user =>
        user.following === (filters.following === 'yes' ? 'Yes' : 'No')
      );
    }
    if (filters.followedBy !== 'all') {
      result = result.filter(user =>
        user.followedBy === (filters.followedBy === 'yes' ? 'Yes' : 'No')
      );
    }
    setFilteredResult(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const exportToCSV = () => {
    if (!filteredResult) return;
  
    // Convert data to CSV format
    const headers = ['Username', 'Following', 'Followed By', 'Following Date', 'Followed By Date'];
    const csvContent = [
      headers.join(','),
      ...filteredResult.map(row => [
        row.username,
        row.following,
        row.followedBy,
        row.followingDate || '',
        row.followedByDate || ''
      ].join(','))
    ].join('\n');
  
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    
    // Check if mobile Firefox
    const isMobileFirefox = navigator.userAgent.toLowerCase().includes('firefox') && 
                           /mobile|tablet|android/i.test(navigator.userAgent);
  
    if (isMobileFirefox) {
      // Create a modal with instructions
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        width: 90%;
        max-width: 400px;
      `;
  
      modal.innerHTML = `
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">Download CSV File</h3>
        <p style="margin: 0 0 15px 0; font-size: 14px;">To save the file:</p>
        <ol style="margin: 0 0 20px 20px; padding: 0; font-size: 14px;">
          <li style="margin-bottom: 8px;">Long press the button below</li>
          <li>Select "Save Link" or "Download Link"</li>
        </ol>
        <a href="${encodedUri}" 
           download="instagram_followers_analysis.csv"
           style="display: block; text-align: center; background: #0095f6; color: white; text-decoration: none; padding: 12px; border-radius: 4px; font-size: 14px;">
          Download CSV File
        </a>
        <button onclick="this.parentElement.remove()" 
                style="position: absolute; top: 10px; right: 10px; border: none; background: none; padding: 5px; cursor: pointer; font-size: 18px;">
          ×
        </button>
      `;
  
      document.body.appendChild(modal);
    } else {
      // For all other browsers, trigger download automatically
      const link = document.createElement('a');
      link.href = encodedUri;
      link.download = 'instagram_followers_analysis.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const getResponsiveColumns = () => {
    const baseColumns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),
        fixed: 'left',
        render: (username) => (
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0095f6',  // Instagram blue
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {username}
            <svg  // External link icon
              viewBox="0 0 24 24"
              width="12"
              height="12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              style={{ marginLeft: '2px' }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ),
      },
      {
        title: "Following Me",
        dataIndex: 'following',
        key: 'following',
      },
      {
        title: 'Followed By Me',
        dataIndex: 'followedBy',
        key: 'followedBy',
      },
      {
        title: 'Following Date',
        dataIndex: 'followingDate',
        key: 'followingDate',
        sorter: (a, b) => {
          if (!a.followingDate) return 1;
          if (!b.followingDate) return -1;
          return new Date(a.followingDate) - new Date(b.followingDate);
        },
        responsive: ['md'],
      },
      {
        title: 'Followed By Date',
        dataIndex: 'followedByDate',
        key: 'followedByDate',
        sorter: (a, b) => {
          if (!a.followedByDate) return 1;
          if (!b.followedByDate) return -1;
          return new Date(a.followedByDate) - new Date(b.followedByDate);
        },
        responsive: ['md'],
      },
    ];

    return baseColumns;
  };

  const renderContent = () => {
    if (error) {
      return (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={() => setError(null)}>
              Dismiss
            </Button>
          }
        />
      );
    }

    if (isLoading || isAnalyzing) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>
            {isAnalyzing ? 'Analyzing your Instagram connections...' : 'Processing your files...'}
          </p>
        </div>
      );
    }

    if (!followersData && !followingData) {
      return (
        <Empty
          image={<FaUpload size={48} />}
          description={
            <div style={{ maxWidth: '100%', padding: '0 16px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Ready to analyze your Instagram connections</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>
                Start by uploading your followers.json file
              </p>
            </div>
          }
        />
      );
    }

    return (
      <>
        {filteredResult && (
          <>
            <Card style={styles.filterCard}>
              <div style={styles.filterContainer}>
                <div style={styles.filterGroup}>
                  <label>Following</label>
                  <Select
                    style={styles.selectWidth}
                    value={filters.following}
                    onChange={(value) => handleFilterChange('following', value)}
                    options={filterOptions}
                  />
                </div>
                <div style={styles.filterGroup}>
                  <label>Followed By</label>
                  <Select
                    style={styles.selectWidth}
                    value={filters.followedBy}
                    onChange={(value) => handleFilterChange('followedBy', value)}
                    options={filterOptions}
                  />
                </div>
                <div style={styles.actionGroup}>
                  <Button
                    block
                    onClick={() => setFilters({ following: 'all', followedBy: 'all' })}
                  >
                    Reset
                  </Button>
                  <Button
                    block
                    type="primary"
                    icon={<FaDownload />}
                    onClick={exportToCSV}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </Card>
            <Table
              dataSource={filteredResult}
              columns={getResponsiveColumns()}
              scroll={{ x: true }}
              size="middle"
              pagination={{
                position: ['bottomCenter'],
                size: 'small',
                defaultPageSize: 10,
                showSizeChanger: false,
              }}
            />
          </>
        )}
      </>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <main>
        {/* <HeroSection /> */}
        <br />
        <h1>Analyze Your Instagram Network</h1>
        <br />
        <div>See who follows you and who doesn't. Get quick insights into your followers using data straight from Instagram. Your data stays on your device and is deleted as soon as you leave this page.</div>
        <br />
        <Link
          href="/how-to-export"
          style={{
            color: '#0095f6',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.9rem',
            padding: '8px 16px',
            background: 'rgba(0, 149, 246, 0.1)',
            borderRadius: '8px',
            transition: 'background 0.2s ease'
          }}
        >
          <span>How to Export Your Follower Data from Instagram</span>
          <FaArrowRight size={16} />
        </Link>
        <br />
        <br />
        <h2>Steps</h2>
        <br />
        <Card style={styles.stepsCard}>
          <Steps
            current={getCurrentStep()}
            size="small"
            direction={isMobile ? 'vertical' : 'horizontal'}
            style={styles.steps}
            items={[
              {
                title: isMobile ? 'Followers' : 'Upload Followers',
                description: isMobile ? 'Upload followers.json' : undefined,
                status: getStepStatus(0)
              },
              {
                title: isMobile ? 'Following' : 'Upload Following',
                description: isMobile ? 'Upload following.json' : undefined,
                status: getStepStatus(1)
              },
              {
                title: 'Analysis',
                description: isMobile ? 'Processing data' : undefined,
                status: getStepStatus(2)
              },
              {
                title: 'Results',
                description: isMobile ? 'View analysis' : undefined,
                status: getStepStatus(3)
              },
            ]}
          />
        </Card>

        <div style={styles.buttonGroup}>
          <Button
            type={!followersData ? "primary" : "default"}
            onClick={() => grabFile(setUploadedFollowersFileName, setFollowersData, 'followers')}
            icon={followersData ? <FaCheck /> : null}
            block
          >
            {followersData ? 'Replace followers.json' : 'Upload followers.json'}
          </Button>
          <Button
            type={!followingData ? "primary" : "default"}
            onClick={() => grabFile(setUploadedFollowingFileName, setFollowingData, 'following')}
            icon={followingData ? <FaCheck /> : null}
            disabled={!followersData}
            block
          >
            {followingData ? 'Replace following.json' : 'Upload following.json'}
          </Button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}